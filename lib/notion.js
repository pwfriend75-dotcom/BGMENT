import { Client } from '@notionhq/client';

// 노션 API 클라이언트 생성
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

/**
 * 1. BGM 아티스트 목록 조회
 * - 노션 DB의 '상태' 속성이 '공개'인 항목만 필터링
 * - '순서' 오름차순 정렬
 */
export async function getArtists() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_ARTIST_DB_ID,
      filter: {
        property: '상태',
        select: {
          equals: '공개',
        },
      },
      sorts: [
        {
          property: '순서',
          direction: 'ascending',
        },
      ],
    });

    return response.results.map((page) => {
      const props = page.properties;
      return {
        id: page.id,
        name: props['아티스트명']?.title[0]?.plain_text || 'BGM Artist',
        thumbnail:
          props['대표 썸네일']?.files[0]?.file?.url ||
          props['대표 썸네일']?.files[0]?.external?.url ||
          '/images/placeholder.jpg',
        type: props['팀/개인 구분']?.select?.name || 'Solo',
        summary: props['요약 소개글']?.rich_text[0]?.plain_text || '',
        snsLinks: props['SNS 링크']?.url || '',
      };
    });
  } catch (error) {
    console.error('BGM Artist DB fetch error:', error);
    return [];
  }
}

/**
 * 2. BGM 아티스트 상세 조회
 */
export async function getArtistById(pageId) {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    const props = page.properties;

    return {
      id: page.id,
      name: props['아티스트명']?.title[0]?.plain_text || 'BGM Artist',
      thumbnail:
        props['대표 썸네일']?.files[0]?.file?.url ||
        props['대표 썸네일']?.files[0]?.external?.url ||
        '/images/placeholder.jpg',
      type: props['팀/개인 구분']?.select?.name || 'Solo',
      summary: props['요약 소개글']?.rich_text[0]?.plain_text || '',
      snsLinks: props['SNS 링크']?.url || '',
    };
  } catch (error) {
    console.error('BGM Artist detail fetch error:', error);
    return null;
  }
}

/**
 * 3. BGM 뉴스/공지사항 목록 조회
 * - 노션 DB의 '상태' 속성이 '게시'인 항목만 필터링
 * - '작성일' 내림차순(최신순) 정렬
 */
export async function getNews() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_NEWS_DB_ID,
      filter: {
        property: '상태',
        select: {
          equals: '게시',
        },
      },
      sorts: [
        {
          property: '작성일',
          direction: 'descending',
        },
      ],
    });

    const totalCount = response.results.length;

    return response.results.map((page, index) => {
      const props = page.properties;
      return {
        id: page.id,
        no: totalCount - index, // 연번 역순 산출
        category: props['구분']?.select?.name || '공지',
        title: props['제목']?.title[0]?.plain_text || '제목 없음',
        author:
          props['작성자']?.rich_text[0]?.plain_text ||
          props['작성자']?.people[0]?.name ||
          'BGM Ent',
        date: props['작성일']?.date?.start || '',
      };
    });
  } catch (error) {
    console.error('BGM News DB fetch error:', error);
    return [];
  }
}

/**
 * 4. BGM 뉴스/공지 상세 조회
 */
export async function getNewsById(pageId) {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    const props = page.properties;

    return {
      id: page.id,
      category: props['구분']?.select?.name || '공지',
      title: props['제목']?.title[0]?.plain_text || '제목 없음',
      author:
        props['작성자']?.rich_text[0]?.plain_text ||
        props['작성자']?.people[0]?.name ||
        'BGM Ent',
      date: props['작성일']?.date?.start || '',
    };
  } catch (error) {
    console.error('BGM News detail fetch error:', error);
    return null;
  }
}
