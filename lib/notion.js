import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});


// ======================================================
// 공통 함수
// ======================================================

function getFileUrl(property) {
  const file = property?.files?.[0];

  if (!file) return '';

  return (
    file?.file?.url ||
    file?.external?.url ||
    ''
  );
}


// ======================================================
// 1. 아티스트 목록
// ======================================================

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
          timestamp: 'last_edited_time',
          direction: 'descending',
        },
      ],
    });

    return response.results.map((page) => {
      const props = page.properties;

      return {
        id: page.id,

        name:
          props['아티스트명']
            ?.title?.[0]
            ?.plain_text || '이름 없음',

        englishName:
          props['영문명']
            ?.rich_text?.[0]
            ?.plain_text || '',

        type:
          props['팀/개인 구분']
            ?.select
            ?.name || 'Artist',

        thumbnail:
          getFileUrl(props['대표 썸네일']) ||
          '/fallback.jpg',

        summary:
          props['요약 소개글']
            ?.rich_text?.[0]
            ?.plain_text || '',

        detail:
          props['상세 소개']
            ?.rich_text?.[0]
            ?.plain_text || '',

        debutDate:
          props['데뷔일']
            ?.date
            ?.start || '',

        sns:
          props['SNS 링크']
            ?.url || '',
      };
    });

  } catch (error) {
    console.error(
      'Notion Artist API Error:',
      error
    );

    return [];
  }
}


// ======================================================
// 2. 아티스트 상세
// ======================================================

export async function getArtistById(id) {
  try {
    const page = await notion.pages.retrieve({
      page_id: id,
    });

    const props = page.properties;

    const blocksResponse =
      await notion.blocks.children.list({
        block_id: id,
        page_size: 100,
      });

    return {
      id: page.id,

      name:
        props['아티스트명']
          ?.title?.[0]
          ?.plain_text || '이름 없음',

      englishName:
        props['영문명']
          ?.rich_text?.[0]
          ?.plain_text || '',

      type:
        props['팀/개인 구분']
          ?.select
          ?.name || 'Artist',

      thumbnail:
        getFileUrl(props['대표 썸네일']) ||
        '/fallback.jpg',

      summary:
        props['요약 소개글']
          ?.rich_text?.[0]
          ?.plain_text || '',

      detail:
        props['상세 소개']
          ?.rich_text?.[0]
          ?.plain_text || '',

      debutDate:
        props['데뷔일']
          ?.date
          ?.start || '',

      sns:
        props['SNS 링크']
          ?.url || '',

      blocks:
        blocksResponse.results,
    };

  } catch (error) {
    console.error(
      'Notion Artist Detail API Error:',
      error
    );

    return null;
  }
}


// ======================================================
// 3. 뉴스 목록
// ======================================================

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
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    });

    return response.results.map((page) => {
      const props = page.properties;

      return {
        id: page.id,

        title:
          props['제목']
            ?.title?.[0]
            ?.plain_text || '제목 없음',

        category:
          props['구분']
            ?.select
            ?.name || '뉴스',

        date:
          props['작성일']
            ?.created_time ||
          page.created_time ||
          '',

        media:
          getFileUrl(
            props['파일과 미디어']
          ),
      };
    });

  } catch (error) {
    console.error(
      'Notion News API Error:',
      error
    );

    return [];
  }
}


// ======================================================
// 4. 뉴스 상세
// ======================================================

export async function getNewsById(id) {
  try {
    const page = await notion.pages.retrieve({
      page_id: id,
    });

    const props = page.properties;

    const blocksResponse =
      await notion.blocks.children.list({
        block_id: id,
        page_size: 100,
      });

    return {
      id: page.id,

      title:
        props['제목']
          ?.title?.[0]
          ?.plain_text || '제목 없음',

      category:
        props['구분']
          ?.select
          ?.name || '뉴스',

      date:
        props['작성일']
          ?.created_time ||
        page.created_time ||
        '',

      media:
        getFileUrl(
          props['파일과 미디어']
        ),

      blocks:
        blocksResponse.results,
    };

  } catch (error) {
    console.error(
      'Notion News Detail API Error:',
      error
    );

    return null;
  }
}
