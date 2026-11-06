export const languages = {
  en: 'English',
  ja: '日本語',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

/**
 * Every string of the interface lives here, once per language.
 * Adding a language = adding a key to `languages` and a block below.
 */
export const ui = {
  en: {
    'site.name': "Cogent's Workers Union",
    'site.shortName': "Cogent's Workers Union",
    'site.tagline': 'Inform · Defend · Act',
    'site.description':
      'News, statements and practical guides from the union section. Your rights, our collective commitment.',
    'site.footerLine': 'Your rights, our collective commitment.',

    'nav.home': 'Home',
    'nav.statements': 'Statements',
    'nav.rights': 'Your rights',
    'nav.demands': 'Our demands',
    'nav.about': 'About the union',
    'nav.skip': 'Skip to content',
    'nav.menu': 'Menu',

    'cta.contact': 'Contact the union',
    'cta.contactLong': 'Contact us by email',

    'home.featured': 'Featured',
    'home.readStatement': 'Read the statement',
    'home.allStatements': 'All statements',
    'home.rights': 'Understand your rights',
    'home.rightsIntro':
      'Practical guides will be published here once reviewed. In the meantime, contact the section with any question about your rights.',
    'home.allRights': 'All practical guides',
    'home.latest': 'Latest posts',
    'home.allNews': 'All news',
    'home.browseTopics': 'Browse topics',
    'home.dossier': 'Featured dossier',
    'home.dossierIntro':
      'The section gathers here verified information and background to make sense of what is at stake at work.',
    'home.allDossiers': 'All dossiers',
    'home.questionTitle': 'A question? Let us talk about it.',
    'home.questionBody':
      'The section is here to inform you, support you and defend your rights.',

    'section.statements': 'Statements',
    'section.news': 'News',
    'section.rights': 'Practical guides',
    'section.dossiers': 'Dossiers',

    'label.statement': 'Statement',
    'label.news': 'News',
    'label.rights': 'Practical guide',
    'label.dossier': 'Dossier',

    'meta.publishedOn': 'Published on',
    'meta.updatedOn': 'Updated on',
    'meta.byTopic': 'By topic',
    'meta.topics': 'Topics',
    'meta.topic': 'Topic',
    'meta.readingTime': 'min read',
    'meta.backTo': 'Back to',
    'meta.share': 'Share',

    'topics.title': 'Topics',
    'topics.intro': 'Browse every post by topic.',
    'topics.count': 'post(s)',

    'empty.section': 'Nothing has been published in this section yet.',
    'empty.translation': 'This article is not available in the other language yet.',

    'footer.keepInTouch': 'Keep in touch',
    'footer.talk': 'Shall we talk?',
    'footer.talkBody':
      'A question, a difficulty, an idea to share? Member or not, the section is here for you.',
    'footer.discordTitle': 'Join the discussion',
    'footer.discordBody': 'Talk with the section and your colleagues.',
    'footer.discordCta': 'Join us',
    'footer.rss': 'RSS feed',
    'footer.legal': 'Legal notice',
    'footer.backToTop': 'Back to content',
    'footer.rights': 'Union section',

    'lang.switch': 'Language',
    'lang.readIn': 'Read this page in',

    '404.title': 'Page not found',
    '404.body': 'This page does not exist, or does not exist any more.',
    '404.back': 'Back to the home page',

    'welcome.title': 'New here?',
    'welcome.body': 'Find out what the union is, or see what we are asking the company for.',
    'welcome.about': 'What is the union?',
    'welcome.demands': 'Our demands',
    'welcome.close': 'Not now',
  },
  ja: {
    'site.name': 'コージェント労働組合',
    'site.shortName': 'コージェント労働組合',
    'site.tagline': '知らせる・守る・行動する',
    'site.description':
      '組合支部からのニュース・声明・実務ガイド。あなたの権利は、私たちみんなの約束です。',
    'site.footerLine': 'あなたの権利は、私たちみんなの約束です。',

    'nav.home': 'ホーム',
    'nav.statements': '声明',
    'nav.rights': '権利について',
    'nav.demands': '私たちの要求',
    'nav.about': '組合について',
    'nav.skip': '本文へ移動',
    'nav.menu': 'メニュー',

    'cta.contact': '組合に連絡',
    'cta.contactLong': 'メールでご連絡ください',

    'home.featured': '注目',
    'home.readStatement': '声明を読む',
    'home.allStatements': 'すべての声明',
    'home.rights': '権利を知る',
    'home.rightsIntro':
      '実務ガイドは内容確認のうえ、こちらに掲載します。それまでは権利に関するご質問を支部までお寄せください。',
    'home.allRights': 'すべての実務ガイド',
    'home.latest': '最新の記事',
    'home.allNews': 'すべてのニュース',
    'home.browseTopics': 'トピックを見る',
    'home.dossier': '注目の特集',
    'home.dossierIntro':
      '支部が確認した情報と背景を特集としてまとめ、職場で起きていることを読み解きます。',
    'home.allDossiers': 'すべての特集',
    'home.questionTitle': 'ご相談はありませんか。',
    'home.questionBody':
      '支部は、情報提供・サポート・権利の擁護のためにここにいます。',

    'section.statements': '声明',
    'section.news': 'ニュース',
    'section.rights': '実務ガイド',
    'section.dossiers': '特集',

    'label.statement': '声明',
    'label.news': 'ニュース',
    'label.rights': '実務ガイド',
    'label.dossier': '特集',

    'meta.publishedOn': '公開日',
    'meta.updatedOn': '更新日',
    'meta.byTopic': 'トピック別',
    'meta.topics': 'トピック',
    'meta.topic': 'トピック',
    'meta.readingTime': '分で読めます',
    'meta.backTo': '戻る：',
    'meta.share': '共有',

    'topics.title': 'トピック',
    'topics.intro': 'トピックごとに記事を探せます。',
    'topics.count': '件',

    'empty.section': 'このセクションにはまだ記事がありません。',
    'empty.translation': 'この記事は他の言語ではまだ公開されていません。',

    'footer.keepInTouch': 'つながる',
    'footer.talk': '話しましょう',
    'footer.talkBody':
      '疑問、困りごと、提案はありませんか。組合員でもそうでなくても、支部はあなたの声を聞きます。',
    'footer.discordTitle': '議論に参加',
    'footer.discordBody': '支部や同僚と話せます。',
    'footer.discordCta': '参加する',
    'footer.rss': 'RSSフィード',
    'footer.legal': '法的事項',
    'footer.backToTop': '本文に戻る',
    'footer.rights': '組合支部',

    'lang.switch': '言語',
    'lang.readIn': 'この言語で読む：',

    '404.title': 'ページが見つかりません',
    '404.body': 'このページは存在しないか、すでに削除されています。',
    '404.back': 'ホームに戻る',

    'welcome.title': 'はじめての方へ',
    'welcome.body': '組合とはどんなものか、私たちが会社に求めていることは何かを、まずご覧ください。',
    'welcome.about': '組合とは？',
    'welcome.demands': '私たちの要求',
    'welcome.close': 'あとで',
  },
} as const;

export type UiKey = keyof (typeof ui)['en'];
