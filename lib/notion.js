import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// =========================
// 1. 아티스트 전체 목록
// =========================
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

      // 현재 Notion DB에는 '순서' 속성이 없으므로
      // 최종 편집 일시 기준으로 정렬
      sorts: [
        {
          timestamp: 'last_edited_time',
          direction: 'descending',
        },
      ],
    });

    return response.results.map((page) => {
      const props = page.properties;

      const thumbnailObj = props['대표 썸네일']?.files?.[0];

      const thumbnail =
        thumbnailObj?.file?.url ||
        thumbnailObj?.external?.url ||
        '/fallback.jpg';

      return {
        id: page.id,

        name:
          props['아티스트명']?.title?.[0]?.plain_text ||
          '이름 없음',

        englishName:
          props['영문명']?.rich_text?.[0]?.plain_text ||
          '',

        type:
          props['팀/개인 구분']?.select?.name ||
          'Artist',

        thumbnail,

        summary:
          props['요약 소개글']?.rich_text?.[0]?.plain_text ||
          '',

        debutDate:
          props['데뷔일']?.date?.start ||
          '',

        sns:
          props['SNS 링크']?.url ||
          '',
      };
    });
  } catch (error) {
    console.error('Notion Artist API Error:', error);

    return [];
  }
}


// =========================
// 2. 아티스트 상세 정보
// =========================
export async function getArtistById(id) {
  try {
    const page = await notion.pages.retrieve({
      page_id: id,
    });

    const props = page.properties;

    const thumbnailObj = props['대표 썸네일']?.files?.[0];

    const thumbnail =
      thumbnailObj?.file?.url ||
      thumbnailObj?.external?.url ||
      '/fallback.jpg';

    const blocksResponse =
      await notion.blocks.children.list({
        block_id: id,
        page_size: 100,
      });

    return {
      id: page.id,

      name:
        props['아티스트명']?.title?.[0]?.plain_text ||
        '이름 없음',

      englishName:
        props['영문명']?.rich_text?.[0]?.plain_text ||
        '',

      type:
        props['팀/개인 구분']?.select?.name ||
        'Artist',

      thumbnail,

      debutDate:
        props['데뷔일']?.date?.start ||
        '',

      summary:
        props['요약 소개글']?.rich_text?.[0]?.plain_text ||
        '',

      detail:
        props['상세 소개']?.rich_text?.[0]?.plain_text ||
        '',

      sns:
        props['SNS 링크']?.url ||
        '',

      blocks: blocksResponse.results,
    };
  } catch (error) {
    console.error('Notion Artist Detail API Error:', error);

    return null;
  }
}


// =========================
// 3. 뉴스 / 공지 전체 목록
// =========================
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

      // 작성일이 Notion의 Created Time 속성이므로
      // 실제 페이지 생성 시각 기준으로 정렬
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    });

    return response.results.map((page) => {
      const props = page.properties;

      const mediaObj =
        props['파일과 미디어']?.files?.[0];

      const media =
        mediaObj?.file?.url ||
        mediaObj?.external?.url ||
        '';

      return {
        id: page.id,

        title:
          props['제목']?.title?.[0]?.plain_text ||
          '제목 없음',

        category:
          props['구분']?.select?.name ||
          '뉴스',

        // 작성일 속성이 Created Time인 경우
        date:
          props['작성일']?.created_time ||
          page.created_time ||
          '',

        media,
      };
    });
  } catch (error) {
    console.error('Notion News API Error:', error);

    return [];
  }
}
