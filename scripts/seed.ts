import 'dotenv/config'
import { createDb } from '../server/db/client'
import * as t from '../server/db/schema'

// Original placeholder content for SMART PLATFORM — edit freely from /admin after seeding.
const db = createDb(process.env.TURSO_DATABASE_URL, process.env.TURSO_AUTH_TOKEN)

const services: (typeof t.services.$inferInsert)[] = [
  {
    slug: 'document-management',
    icon: 'lucide:folder-tree',
    titleAr: 'إدارة الوثائق',
    titleEn: 'Document Management',
    summaryAr: 'نبني لكم دليلاً تصنيفياً واضحاً وسياسات حفظ تجعل الوصول إلى أي وثيقة مسألة ثوانٍ.',
    summaryEn: 'We design a clear classification scheme and retention policies so any document is seconds away.',
    highlightAr: 'تصنيف آلي مقترح للوثائق الجديدة',
    highlightEn: 'Suggested auto-classification for new documents',
    bodyAr: 'نبدأ بدراسة واقع الوثائق لديكم، ثم نصمم هيكل تصنيف ومدد حفظ معتمدة، ونطبقها على أنظمتكم مع تدريب فرق العمل.\nتشمل الخدمة: حصر الوثائق، إعداد جداول المدد، إجراءات الإتلاف الآمن، وأدلة العمل.',
    bodyEn: 'We start by assessing your current records, then design an approved classification and retention structure, apply it to your systems and train your teams.\nIncludes: records inventory, retention schedules, secure disposal procedures and operating guides.',
    sort: 1,
  },
  {
    slug: 'e-archiving',
    icon: 'lucide:scan-line',
    titleAr: 'الأرشفة الإلكترونية والمسح الضوئي',
    titleEn: 'E-Archiving & Scanning',
    summaryAr: 'نحوّل الأرشيف الورقي إلى نسخ رقمية قابلة للبحث بجودة عالية وفهرسة دقيقة.',
    summaryEn: 'We turn paper archives into high-quality, searchable digital records with accurate indexing.',
    highlightAr: 'تعرّف ضوئي على النصوص العربية',
    highlightEn: 'Arabic-aware text recognition (OCR)',
    bodyAr: 'فرق ميدانية مجهزة تتولى التجهيز والمسح والفهرسة والمراجعة، ثم ترحيل الملفات إلى نظام الأرشفة لديكم أو إلى منصتنا.',
    bodyEn: 'Equipped field teams handle preparation, scanning, indexing and QA, then migrate files into your archive system or ours.',
    sort: 2,
  },
  {
    slug: 'fixed-assets',
    icon: 'lucide:barcode',
    titleAr: 'حصر وترميز الأصول الثابتة',
    titleEn: 'Fixed Asset Tagging',
    summaryAr: 'جرد ميداني شامل وترميز بالباركود ومطابقة مع السجلات المحاسبية.',
    summaryEn: 'Full field counts, barcode tagging and reconciliation with your accounting records.',
    highlightAr: 'تطبيق جوال للجرد الدوري',
    highlightEn: 'Mobile app for periodic counts',
    bodyAr: 'نحصر الأصول في جميع المواقع، ونلصق ملصقات معرّفة، ونسلمكم سجلاً موحداً جاهزاً للربط مع نظامكم المالي.',
    bodyEn: 'We count assets across all sites, apply identification labels, and hand over a unified register ready to link with your finance system.',
    sort: 3,
  },
  {
    slug: 'knowledge-management',
    icon: 'lucide:brain-circuit',
    titleAr: 'إدارة المعرفة',
    titleEn: 'Knowledge Management',
    summaryAr: 'نجمع خبرات المنظمة في مستودع واحد يسهل البحث فيه ويحافظ على المعرفة من الضياع.',
    summaryEn: 'We capture organizational know-how in one searchable hub so expertise is never lost.',
    highlightAr: 'بوابة معرفة داخلية بصلاحيات',
    highlightEn: 'Internal knowledge portal with permissions',
    bodyAr: 'تصميم إطار إدارة المعرفة، وبناء البوابة، وتوثيق الإجراءات والدروس المستفادة.',
    bodyEn: 'Knowledge framework design, portal build-out, and documentation of procedures and lessons learned.',
    sort: 4,
  },
  {
    slug: 'ai-solutions',
    icon: 'lucide:sparkles',
    titleAr: 'حلول الذكاء الاصطناعي',
    titleEn: 'AI Solutions',
    summaryAr: 'استخراج البيانات من المستندات، والبحث الدلالي، وأتمتة المهام المتكررة.',
    summaryEn: 'Data extraction from documents, semantic search and automation of repetitive work.',
    highlightAr: 'بحث بالمعنى باللغة العربية',
    highlightEn: 'Meaning-based search in Arabic',
    bodyAr: 'نحدد حالات الاستخدام الأعلى أثراً، ونبني نماذج أولية سريعة، ثم ندمجها مع أنظمتكم بأمان.',
    bodyEn: 'We identify the highest-impact use cases, build quick prototypes, then integrate them safely with your systems.',
    sort: 5,
  },
  {
    slug: 'facility-management',
    icon: 'lucide:building-2',
    titleAr: 'إدارة المرافق',
    titleEn: 'Facility Management',
    summaryAr: 'منصة لإدارة الزوار والحجوزات والصيانة والمواقف من شاشة واحدة.',
    summaryEn: 'One platform for visitors, bookings, maintenance and parking.',
    highlightAr: 'لوحات متابعة لحظية',
    highlightEn: 'Real-time dashboards',
    bodyAr: 'وحدات مستقلة يمكن تفعيلها حسب الحاجة، متاحة سحابياً أو على خوادمكم.',
    bodyEn: 'Independent modules you enable as needed, available in the cloud or on your own servers.',
    sort: 6,
  },
  {
    slug: 'custom-development',
    icon: 'lucide:code-2',
    titleAr: 'التطوير والتكامل',
    titleEn: 'Development & Integration',
    summaryAr: 'تطوير أنظمة مخصصة وربطها مع الأنظمة القائمة عبر واجهات برمجية آمنة.',
    summaryEn: 'Custom systems and secure API integrations with your existing platforms.',
    highlightAr: 'تكامل مع الأنظمة الحكومية والمالية',
    highlightEn: 'Integrations with government and finance systems',
    bodyAr: 'فريق تطوير داخلي يعمل بمنهجية مرنة مع تسليمات دورية ودعم بعد الإطلاق.',
    bodyEn: 'An in-house team working in agile iterations with regular deliveries and post-launch support.',
    sort: 7,
    featured: false,
  },
]

const products: (typeof t.products.$inferInsert)[] = [
  {
    slug: 'smart-archive',
    icon: 'lucide:archive',
    nameAr: 'سمارت أرشيف',
    nameEn: 'Smart Archive',
    summaryAr: 'نظام أرشفة ومشاركة وثائق بصلاحيات دقيقة وتنبيهات انتهاء ومسارات عمل.',
    summaryEn: 'Document archiving and sharing with fine-grained permissions, expiry alerts and workflows.',
    featuresAr: 'صلاحيات على مستوى المجلد والملف\nوسوم وبحث متقدم\nتنبيهات انتهاء الوثائق\nمسارات اعتماد',
    featuresEn: 'Folder and file-level permissions\nTags and advanced search\nDocument expiry alerts\nApproval workflows',
    sort: 1,
  },
  {
    slug: 'smart-sign',
    icon: 'lucide:file-signature',
    nameAr: 'سمارت توقيع',
    nameEn: 'Smart Sign',
    summaryAr: 'تطبيق مكتبي لتحرير ملفات PDF وتوقيعها دون الحاجة للإنترنت.',
    summaryEn: 'A desktop app to edit and sign PDF files, fully offline.',
    featuresAr: 'يعمل دون اتصال\nتوقيع وختم\nدمج وتقسيم الملفات',
    featuresEn: 'Works offline\nSignatures and stamps\nMerge and split files',
    sort: 2,
  },
  {
    slug: 'smart-correspondence',
    icon: 'lucide:mail',
    nameAr: 'سمارت مراسلات',
    nameEn: 'Smart Correspondence',
    summaryAr: 'إدارة الصادر والوارد والتعاميم مع تتبع كامل لمسار كل معاملة.',
    summaryEn: 'Incoming, outgoing and internal memos with full tracking of every transaction.',
    featuresAr: 'ترقيم آلي\nإحالات وتتبع\nتقارير أداء',
    featuresEn: 'Automatic numbering\nReferrals and tracking\nPerformance reports',
    sort: 3,
  },
  {
    slug: 'smart-facilities',
    icon: 'lucide:layout-dashboard',
    nameAr: 'سمارت مرافق',
    nameEn: 'Smart Facilities',
    summaryAr: 'منصة معيارية لإدارة الزوار والقاعات والصيانة والمواقف.',
    summaryEn: 'A modular platform for visitors, rooms, maintenance and parking.',
    featuresAr: 'وحدات قابلة للتفعيل\nسحابي أو داخلي\nتطبيق جوال',
    featuresEn: 'Pluggable modules\nCloud or on-premise\nMobile app',
    sort: 4,
  },
]

const faqs: (typeof t.faqs.$inferInsert)[] = [
  {
    questionAr: 'هل حلولكم متوافقة مع الأنظمة المحلية؟',
    questionEn: 'Are your solutions aligned with local regulations?',
    answerAr: 'نعم، نصمم كل مشروع وفق الأنظمة واللوائح المعمول بها في المملكة، ونوثق ذلك في تقرير التسليم.',
    answerEn: 'Yes. Every project is designed around the applicable Saudi regulations, documented in the handover report.',
    sort: 1,
  },
  {
    questionAr: 'هل يمكن طلب الخدمات الميدانية دون شراء الأنظمة؟',
    questionEn: 'Can I order field services without buying software?',
    answerAr: 'بالتأكيد، كل خدمة ومنتج متاح بشكل مستقل، ويمكن الجمع بينها لاحقاً.',
    answerEn: 'Absolutely. Each service and product is available on its own and can be combined later.',
    sort: 2,
  },
  {
    questionAr: 'هل تتوفر الأنظمة للتثبيت على خوادمنا؟',
    questionEn: 'Can the systems be installed on our own servers?',
    answerAr: 'نعم، نوفر خيار التثبيت الداخلي إلى جانب الخيار السحابي.',
    answerEn: 'Yes, on-premise installation is available alongside the cloud option.',
    sort: 3,
  },
  {
    questionAr: 'كيف نبدأ؟',
    questionEn: 'How do we get started?',
    answerAr: 'أرسل طلب عرض سعر وسيتواصل معك أحد مستشارينا خلال يوم عمل لترتيب زيارة تقييم مجانية.',
    answerEn: 'Send a quote request and a consultant will contact you within one business day to arrange a free assessment.',
    sort: 4,
  },
]

const stats: (typeof t.stats.$inferInsert)[] = [
  { icon: 'lucide:award', value: 10, suffix: '+', labelAr: 'سنوات خبرة', labelEn: 'Years of experience', sort: 1 },
  { icon: 'lucide:briefcase-business', value: 250, suffix: '+', labelAr: 'مشروع منجز', labelEn: 'Projects delivered', sort: 2 },
  { icon: 'lucide:files', value: 3, suffix: 'M+', labelAr: 'وثيقة مؤرشفة', labelEn: 'Documents archived', sort: 3 },
  { icon: 'lucide:smile', value: 98, suffix: '%', labelAr: 'رضا العملاء', labelEn: 'Client satisfaction', sort: 4 },
]

const sectors: (typeof t.sectors.$inferInsert)[] = [
  { icon: 'lucide:landmark', titleAr: 'الجهات الحكومية', titleEn: 'Government entities', sort: 1 },
  { icon: 'lucide:graduation-cap', titleAr: 'الجامعات والتعليم', titleEn: 'Universities & education', sort: 2 },
  { icon: 'lucide:heart-pulse', titleAr: 'القطاع الصحي', titleEn: 'Healthcare', sort: 3 },
  { icon: 'lucide:building', titleAr: 'البلديات والخدمات', titleEn: 'Municipalities & utilities', sort: 4 },
  { icon: 'lucide:briefcase', titleAr: 'الشركات الخاصة', titleEn: 'Private companies', sort: 5 },
  { icon: 'lucide:shield', titleAr: 'القطاعات الأمنية', titleEn: 'Security sectors', sort: 6 },
]

const steps: (typeof t.steps.$inferInsert)[] = [
  { titleAr: 'التقييم', titleEn: 'Assessment', descriptionAr: 'زيارة ميدانية لفهم الواقع وتحديد النطاق.', descriptionEn: 'An on-site visit to understand your situation and define scope.', sort: 1 },
  { titleAr: 'التصميم', titleEn: 'Design', descriptionAr: 'خطة تنفيذ تفصيلية وعرض سعر واضح للاعتماد.', descriptionEn: 'A detailed delivery plan and clear quote for approval.', sort: 2 },
  { titleAr: 'التنفيذ', titleEn: 'Delivery', descriptionAr: 'تنفيذ ميداني وتقني مع مراجعات جودة مستمرة.', descriptionEn: 'Field and technical delivery with continuous quality checks.', sort: 3 },
  { titleAr: 'التشغيل والدعم', titleEn: 'Launch & support', descriptionAr: 'تدريب الفريق وتسليم النظام ودعم سنوي.', descriptionEn: 'Team training, system handover and annual support.', sort: 4 },
]

const settings: Record<string, string> = {
  phone: '+966 50 000 0000',
  email: 'info@smart-platform.sa',
  whatsapp: '966500000000',
  addressAr: 'الرياض، المملكة العربية السعودية',
  addressEn: 'Riyadh, Saudi Arabia',
  hoursAr: 'الأحد – الخميس، 9 ص – 5 م',
  hoursEn: 'Sun – Thu, 9 AM – 5 PM',
  mapUrl: 'https://maps.google.com/?q=Riyadh',
  sinceYear: '2016',
}

await db.delete(t.services)
await db.delete(t.products)
await db.delete(t.faqs)
await db.delete(t.stats)
await db.delete(t.sectors)
await db.delete(t.steps)
await db.delete(t.settings)

await db.insert(t.services).values(services)
await db.insert(t.products).values(products)
await db.insert(t.faqs).values(faqs)
await db.insert(t.stats).values(stats)
await db.insert(t.sectors).values(sectors)
await db.insert(t.steps).values(steps)
await db.insert(t.settings).values(Object.entries(settings).map(([key, value]) => ({ key, value })))

console.log('Seed complete (requests table left untouched).')
