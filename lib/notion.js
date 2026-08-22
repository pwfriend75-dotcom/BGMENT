import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

// 1. 아티스트 전체 목록
export async function getArtists() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_ARTIST_DB_ID,
    filter: {
      property: '상태',
      select: { equals: '공개' },
    },
    sorts: [{ property: '순서', direction: 'ascending' }],
  });

  return response.results.map((page) => {
    const props = page.properties;
    const thumbnailObj = props['대표 썸네일']?.files?.[0];
    const imgUrl = thumbnailObj?.file?.url || thumbnailObj?.external?.url || '/fallback.jpg';

    return {
      id: page.id,
      name: props['아티스트명']?.title?.[0]?.plain_text || '이름 없음',
      englishName: props['영문명']?.rich_text?.[0]?.plain_text || '',
      type: props['팀/개인 구분']?.select?.name || 'Artist',
      thumbnail: imgUrl,
      summary: props['요약 소개글']?.rich_text?.[0]?.plain_text || '',
    };
  });
}

// 2. 아티스트 상세 정보 및 본문 블록 가져오기
export async function getArtistById(id) {
  try {
    const page = await notion.pages.retrieve({ page_id: id });
    const props = page.properties;

    const thumbnailObj = props['대표 썸네일']?.files?.[0];
    const imgUrl = thumbnailObj?.file?.url || thumbnailObj?.external?.url || '/fallback.jpg';

    // 노션 페이지 내부 본문(블록) 가져오기
    const blocks = await notion.blocks.children.list({ block_id: id });

    return {
      id: page.id,
      name: props['아티스트명']?.title?.[0]?.plain_text || '이름 없음',
      englishName: props['영문명']?.rich_text?.[0]?.plain_text || '',
      type: props['팀/개인 구분']?.select?.name || 'Artist',
      thumbnail: imgUrl,
      debutDate: props['데뷔일']?.date?.start || '',
      summary: props['요약 소개글']?.rich_text?.[0]?.plain_text || '',
      sns: props['SNS 링크']?.url || '#',
      blocks: blocks.results,
    };
  } catch (error) {
    console.error('Error fetching artist detail:', error);
    return null;
  }
}

// 3. 뉴스/공지 전체 목록
export async function getNews() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_NEWS_DB_ID,
    filter: {
      property: '상태',
      select: { equals: '게시' },
    },
    sorts: [{ property: '작성일', direction: 'descending' }],
  });

  return response.results.map((page) => {
    const props = page.properties;
    return {
      id: page.id,
      title: props['제목']?.title?.[0]?.plain_text || '제목 없음',
      category: props['구분']?.select?.name || '뉴스',
      date: props['작성일']?.date?.start || '',
    };
  });
}
