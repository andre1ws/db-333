import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  Archive, ArrowDown, ArrowDownUp, ArrowUp, ArrowUpDown, BadgePercent, BarChart3, CalendarDays,
  Check, ChevronDown, ChevronLeft, ChevronRight, CircleCheck, CircleDollarSign, CircleHelp, Clock, Columns3,
  CreditCard, Download, ExternalLink, FileDown, FilePlus2, FileText, Handshake, ImagePlus, Info, Landmark,
  Menu, MessageCircle, MessagesSquare, Monitor, Pencil, PlaySquare, Plus,
  Receipt, RefreshCw, Rocket, ScanFace, Search, SlidersHorizontal, Smartphone,
  Trash2, TrendingUp, UserRound, Users, Video, Wallet, X, Zap,
} from 'lucide-react'
import './App.css'

/* Page toolbars sit in the top bar, but their state belongs to the pages —
   so each page renders its toolbar through a portal into a slot the header owns. */
const HeaderSlotContext = createContext(null)

function HeaderTools({ children }) {
  const slot = useContext(HeaderSlotContext)
  return slot ? createPortal(children, slot) : null
}

const navItems = [
  {
    label: 'Administrator',
    icon: Users,
    children: [
      { label: 'Users' },
      { label: 'Notifications' },
      { label: 'Labels' },
      { label: 'Promotions' },
      { label: 'Roles' },
    ],
  },
  { label: 'Departments', icon: FileText },
  {
    label: 'Payments',
    icon: CircleDollarSign,
    dot: true,
    children: [
      { label: 'Transactions CY', badge: 37 },
      { label: 'Transactions CA' },
      { label: 'Transactions CN', badge: 68 },
      { label: 'Transactions HK', badge: 1 },
      { label: 'Payment methods' },
      { label: 'Regions' },
    ],
  },
  { label: 'CSP', icon: Handshake, arrow: true },
  { label: 'Payment accounts', icon: Landmark, arrow: true },
  { label: 'Contracts', icon: Receipt },
  { label: 'Requests', icon: PlaySquare, dot: true, arrow: true },
  { label: 'Analytics', icon: TrendingUp },
  { label: 'Funds', icon: BarChart3 },
  { label: 'Perks and Benefits', icon: BadgePercent, arrow: true },
  { label: 'Assets', icon: Monitor },
  { label: 'Channels', icon: Video },
  { label: 'Knowledge base', icon: MessagesSquare, arrow: true },
]

const notifications = [
  {
    id: 1, sender: 'Vladislava Kotova', email: 'v.kotova@mediacube.io', avatar: 'default',
    segment: 'Users', push: true, sent: '2026-07-02',
    title: 'Important Update: Withdrawal Fee Changes Effective July 6, 2026',
    preview: 'Dear User, We are writing to inform you of an upcoming change to the fee for fund withdrawals from your balance.',
  },
  {
    id: 2, sender: 'Andrei Vasileuski', email: 'andre@mediacube.io', avatar: 'default',
    segment: 'Users', push: true, sent: '2026-07-01',
    title: 'Perks and Benefits in Garna',
    preview: 'We know how much of your budget goes toward work tools, so we’ve negotiated exclusive deals for you.',
  },
  {
    id: 3, sender: 'Maria Lapchik G', email: 'lapm@mediacube.io', avatar: 'photo-d',
    segment: 'Users', push: false, sent: '2026-06-26',
    title: 'Hi! We are delighted to welcome you to the Garna platform!',
    preview: 'Your profile has been successfully registered. Your account is now officially linked to Legal Entity.',
  },
  {
    id: 4, sender: 'Maria Lapchik G', email: 'lapm@mediacube.io', avatar: 'photo-d',
    segment: 'Users', push: false, sent: '2026-06-26',
    title: 'Hi! We are delighted to welcome you to the Garna platform!',
    preview: 'Your profile has been successfully registered. Your account is now officially linked to Legal Entity.',
  },
  {
    id: 5, sender: 'Maria Lapchik G', email: 'lapm@mediacube.io', avatar: 'photo-d',
    segment: 'Users', push: false, sent: '2026-06-26',
    title: 'Добрый день! Рады приветствовать вас на платформе Garna!',
    preview: 'Ваш профиль успешно зарегистрирован. Мы рады сообщить, что ваш аккаунт официально привязан к юрлицу.',
  },
  {
    id: 6, sender: 'Maria Lapchik G', email: 'lapm@mediacube.io', avatar: 'photo-d',
    segment: 'Users', push: false, sent: '2026-06-26',
    title: 'Добрый день! Рады приветствовать вас на платформе Garna!',
    preview: 'Ваш профиль успешно зарегистрирован. Мы рады сообщить, что ваш аккаунт официально привязан к юрлицу.',
  },
  {
    id: 7, sender: 'Alesia Marchuk', email: 'almar@mediacube.io', avatar: 'photo-c',
    segment: 'Users', push: true, sent: '2026-06-23',
    title: 'Scheduled Maintenance',
    preview: 'On June 24, from 08:00 to 13:00 UTC, crypto withdrawals will be unavailable. This is a planned maintenance window.',
  },
  {
    id: 8, sender: 'KaterinaQ Kot', email: 'em@mediacube.io', avatar: 'photo-b',
    segment: 'Users', push: false, sent: '2026-05-26',
    title: 'e',
    preview: 'тест',
  },
  {
    id: 9, sender: 'Evgeniia Frolenkova', email: 'fro@mediacube.io', avatar: 'photo-a',
    segment: 'Users', push: true, sent: '2026-05-14',
    title: 'Your Advance is waiting — check it now',
    preview: 'Get an Advance for up to 12 months — calculate amount in MC Pay',
  },
  {
    id: 10, sender: 'Alesia Marchuk', email: 'almar@mediacube.io', avatar: 'photo-c',
    segment: 'Users', push: true, sent: '2026-05-12',
    title: 'Crypto wallet terms update',
    preview: 'Starting May 15, 2026, an inactivity fee of 200 USD/month will apply to wallets with no transactions.',
  },
  {
    id: 11, sender: 'Maksim Trafimau', email: 'maxtro@mediacube.io', avatar: 'default',
    segment: 'CSP', push: false, sent: '2026-05-08',
    title: 'YouTube payout information update',
    preview: 'Due to temporary delays in receiving funds from YouTube and completing the required checks, payouts may arrive later.',
  },
  {
    id: 12, sender: 'Alesia Marchuk', email: 'almar@mediacube.io', avatar: 'photo-c',
    segment: 'Users', push: true, sent: '2026-05-06',
    title: 'Изменения выплат в RUB',
    preview: 'В связи с санкционными ограничениями с 14 мая прекращаются выплаты на счета в российских банках.',
  },
  {
    id: 13, sender: 'Vladislav Filipovich G', email: 'filv@mediacube.io', avatar: 'photo-b',
    segment: 'Users', push: false, sent: '2026-05-05',
    title: 'Crypto withdrawal fee update',
    preview: 'Starting May 1, 2026, the crypto withdrawal fee will increase by a fixed 5 USD on top of the network fee.',
  },
  {
    id: 14, sender: 'Vladislav Filipovich G', email: 'filv@mediacube.io', avatar: 'photo-b',
    segment: 'Users', push: false, sent: '2026-05-05',
    title: 'We’d like to share a few important updates with you',
    preview: 'Changes in the list of banks available for withdrawals in Russia and crypto withdrawal fee update.',
  },
  {
    id: 15, sender: 'Vladislav Filipovich G', email: 'filv@mediacube.io', avatar: 'photo-b',
    segment: 'Users', push: false, sent: '2026-05-05',
    title: 'We’d like to share a few important updates with you',
    preview: 'Changes in Belarusian banking operations and crypto withdrawal fee update',
  },
]

const transactions = [
  { id: 1, user: 'Zakhar M', avatar: 'default', flagged: false, status: 'NEW', express: false, created: '2026-09-04', updated: '2026-09-04', method: 'Tether TRC20 – USDT', methodLink: true, amount: 8400 },
  { id: 2, user: 'Tatsiana Saroka', avatar: 'default', flagged: true, status: 'NEW', express: false, created: '2026-09-04', updated: '2026-09-04', method: 'To an account in BYN (non sanctioned banks)', methodLink: false, amount: 1250 },
  { id: 3, user: 'Broken Mouse Media LTD', avatar: 'default', flagged: false, status: 'CONFIRMED', express: false, created: '2026-09-04', updated: '2026-09-04', method: 'To an account in local currency (Airwallex)', methodLink: true, amount: 104300 },
  { id: 4, user: 'Daniil Parshukov', avatar: 'default', flagged: false, status: 'NEW', express: false, created: '2026-09-04', updated: '2026-09-04', method: 'To an account in RUB (non sanctioned banks)', methodLink: true, amount: 3120 },
  { id: 5, user: 'KONTORA GAMES LLC', avatar: 'default', flagged: false, status: 'NEW', express: false, created: '2026-09-04', updated: '2026-09-04', method: 'Tether TRC20 – USDT', methodLink: false, amount: 46800 },
  { id: 6, user: 'Ilia Egorov', avatar: 'default', flagged: true, status: 'NEW', express: false, created: '2026-09-04', updated: '2026-09-04', method: 'To an account in USD (Airwallex, personal)', methodLink: false, amount: 5600 },
  { id: 7, user: 'Rishabh Singh', avatar: 'default', flagged: false, status: 'NEW', express: false, created: '2026-09-04', updated: '2026-09-04', method: 'PayPal – USD', methodLink: true, amount: 940 },
  { id: 8, user: 'Aiturgan Abdrazakova', avatar: 'photo-a', flagged: false, status: 'CONFIRMED', express: false, created: '2026-09-04', updated: '2026-09-04', method: 'To a card in USD (Paysend)', methodLink: true, amount: 730 },
  { id: 9, user: 'HFL Communication company', avatar: 'default', flagged: false, status: 'NEW', express: false, created: '2026-09-04', updated: '2026-09-04', method: 'To an account in USD (Airwallex)', methodLink: true, amount: 168400 },
  { id: 10, user: 'Hong Jie Lee', avatar: 'default', flagged: false, status: 'NEW', express: false, created: '2026-09-04', updated: '2026-09-04', method: 'To a card in USD (Paysend)', methodLink: true, amount: 21500 },
  { id: 11, user: 'SETEL', avatar: 'default', flagged: false, status: 'NEW', express: false, created: '2026-09-04', updated: '2026-09-04', method: 'To an account in USD (Airwallex)', methodLink: true, amount: 62700 },
  { id: 12, user: 'Shine Image Culture Limited', avatar: 'default', flagged: false, status: 'NEW', express: false, created: '2026-09-04', updated: '2026-09-04', method: 'To an account in USD (Airwallex)', methodLink: true, amount: 109800 },
  { id: 13, user: 'Alikhan Zhapayev', avatar: 'default', flagged: false, status: 'CONFIRMED', express: false, created: '2026-09-04', updated: '2026-09-04', method: 'To a card in USD (Paysend)', methodLink: true, amount: 1480 },
  { id: 14, user: 'Van Nghia Le', avatar: 'default', flagged: true, status: 'NEW', express: false, created: '2026-09-04', updated: '2026-09-04', method: 'Tether TRC20 – USDT', methodLink: false, amount: 3260 },
  { id: 15, user: 'Esttik Associate', avatar: 'photo-c', flagged: false, status: 'NEW', express: true, created: '2026-09-04', updated: '2026-09-04', method: 'To an account in EUR (Payoneer)', methodLink: true, amount: 17900 },
  { id: 16, user: 'FERNANDO GABRIEL ROMERO', avatar: 'photo-b', flagged: false, status: 'CONFIRMED', express: false, created: '2026-09-04', updated: '2026-09-04', method: 'Tether ERC20 – USDT', methodLink: true, amount: 12640 },
]

const transactionStats = [
  { label: 'Quick Transfer', icon: Rocket, count: 0 },
  { label: 'Require clarification', icon: CreditCard, count: 1 },
  { label: 'New', icon: Wallet, count: 37 },
]

const promotions = [
  { id: 1, name: 'Save on Services with Garna', segment: 'Users', countries: 'All countries', leadsTo: 'Balance', endDate: '—', updated: '09 Jul 2026' },
  { id: 2, name: 'Update your mobile app', segment: 'CSP', countries: 'All countries', leadsTo: 'Balance', endDate: '—', updated: '16 Apr 2026' },
  { id: 3, name: 'Confirm actions faster with Biometrics', segment: 'Users', countries: 'All countries', leadsTo: 'Balance', endDate: '—', updated: '25 Mar 2026' },
  { id: 4, name: 'New creator verification flow', segment: 'Users', countries: 'All countries', leadsTo: 'Balance', endDate: '30 Sep 2026', updated: '25 Mar 2026' },
  { id: 5, name: 'FAQ: Service Update', segment: 'Users', countries: 'All countries', leadsTo: 'Balance', endDate: '—', updated: '24 Mar 2026' },
  { id: 6, name: 'FAQ: Payments Update', segment: 'Users', countries: 'All countries', leadsTo: 'Balance', endDate: '—', updated: '24 Mar 2026' },
  { id: 7, name: 'FAQ: Account Security', segment: 'Users', countries: 'All countries', leadsTo: 'Balance', endDate: '—', updated: '24 Mar 2026' },
  { id: 8, name: 'FAQ: Mobile Studio', segment: 'Users', countries: 'All countries', leadsTo: 'Balance', endDate: '—', updated: '24 Mar 2026' },
  { id: 9, name: 'FAQ: Voice Cloning', segment: 'Users', countries: 'All countries', leadsTo: 'Balance', endDate: '—', updated: '24 Mar 2026' },
  { id: 10, name: 'Help us become better', segment: 'CSP', countries: 'All countries', leadsTo: 'Balance', endDate: '—', updated: '11 Mar 2026' },
  { id: 11, name: 'Confirmation codes are now safer', segment: 'CSP', countries: 'Kazakhstan +2', leadsTo: 'Balance', endDate: '—', updated: '11 Mar 2026' },
  { id: 12, name: 'Confirmation codes in your region', segment: 'CSP', countries: 'Russia +2', leadsTo: 'Balance', endDate: '—', updated: '11 Mar 2026' },
  { id: 13, name: 'How to create an offer?', segment: 'CSP', countries: 'All countries', leadsTo: 'Balance', endDate: '—', updated: '11 Mar 2026' },
  { id: 14, name: 'Offers for freelancers', segment: 'CSP', countries: 'All countries', leadsTo: 'Balance', endDate: '—', updated: '11 Mar 2026' },
]

const labels = [
  { id: 1, name: 'Horyx', csp: ['Horyx'], more: 0, domain: 'app.horyx.com', app: false },
  { id: 2, name: '2btube', csp: ['2BTUBE'], more: 0, domain: 'mcpay2btube.com', app: true },
  { id: 3, name: 'Garna', csp: ['SMART SYSTEMS - FZCO | Garna', 'IT-SKILLS SRL | Garna'], more: 937, domain: 'app.garna.io', app: true },
  { id: 4, name: 'Unite.ad', csp: ['THINKBIG'], more: 0, domain: 'pay.thinkbigcsp.com', app: true },
  { id: 5, name: 'POPSync', csp: ['POPS'], more: 0, domain: 'popssync.com', app: true },
  { id: 6, name: 'UFG Pay', csp: ['UFG'], more: 0, domain: 'app.unionforgamers.com', app: true },
  { id: 7, name: 'CentroFlex', csp: ['Fansly', 'Clips4Sale | Centroflex', 'CentroFlex | Garna'], more: 0, domain: 'centroflex.com', app: true },
  { id: 8, name: 'RHEI Pay Pro', csp: ['RHEI'], more: 0, domain: 'paypro.rhei.com', app: false },
  { id: 9, name: 'Shft', csp: ['Diwan'], more: 0, domain: 'weareshft.com', app: false },
  { id: 10, name: 'MC Pay', csp: ['Meltechmusic', 'mediacube', 'Play Network', 'Divo', 'ZoyaTech Limited'], more: 42, domain: 'mcpay.io', app: true },
]

const users = [
  {
    id: 1,
    name: 'Andrey Gorbatykh',
    username: 'andriihorbatykh@genesispsp.com',
    email: 'andriihorbatykh@genesispsp.com',
    role: null,
    kyc: null,
    lastAction: '26 Aug 2026',
    device: 'desktop',
    registered: '30 Oct 2023',
    avatar: 'default',
  },
  {
    id: 2,
    name: 'Angel Gabriel Espinosa Nava',
    username: 'gabrielen105251@outlook.com',
    email: 'gabrielen105251@outlook.com',
    role: null,
    kyc: null,
    lastAction: '26 Aug 2026',
    device: 'desktop',
    registered: '26 Aug 2026',
    avatar: 'photo-a',
  },
  {
    id: 3,
    name: 'Ivan Belchikov',
    username: 'johnbel@yandex.ru',
    email: 'johnbel@yandex.ru',
    role: null,
    kyc: 'APPROVED',
    lastAction: '26 Aug 2026',
    device: 'desktop',
    registered: '26 Aug 2026',
    avatar: 'photo-b',
  },
  {
    id: 4,
    name: 'Alina Sapon',
    username: 'sapina@mediacube.io',
    email: 'sapina@mediacube.io',
    role: 'Community manager 2.0',
    kyc: null,
    lastAction: '26 Aug 2026',
    device: 'desktop',
    registered: '17 Apr 2024',
    avatar: 'default',
  },
  {
    id: 5,
    name: 'Katsiaryna Markevich',
    username: 'katmark@mediacube.io',
    email: 'katmark@mediacube.io',
    role: 'Support manager',
    kyc: 'APPROVED',
    lastAction: '26 Aug 2026',
    device: 'desktop',
    registered: '26 Feb 2025',
    avatar: 'default',
  },
  {
    id: 6,
    name: 'castle faceit',
    username: 'castlefaceit@gmail.com',
    email: 'castlefaceit@gmail.com',
    role: null,
    kyc: 'BLOCKED',
    lastAction: '26 Aug 2026',
    device: 'desktop',
    registered: '19 Aug 2026',
    avatar: 'photo-c',
  },
  {
    id: 7,
    name: 'Andrei Vasileuski',
    username: 'andre@mediacube.io',
    email: 'andre@mediacube.io',
    role: 'Super admin',
    kyc: 'APPROVED',
    lastAction: '26 Aug 2026',
    device: 'desktop',
    registered: '15 Nov 2021',
    avatar: 'default',
  },
  {
    id: 8,
    name: 'Dmitry Korshunov',
    username: 'dmitry@voiceon.ai',
    email: 'dmitry@voiceon.ai',
    role: 'Garna Partner (CY)',
    kyc: 'APPROVED',
    lastAction: '25 Aug 2026',
    device: 'mobile',
    registered: '03 Mar 2022',
    avatar: 'default',
  },
  {
    id: 9,
    name: 'Sofia Reed',
    username: 'sofia.reed@voiceon.ai',
    email: 'sofia.reed@voiceon.ai',
    role: 'Studio editor',
    kyc: null,
    lastAction: '24 Aug 2026',
    device: 'mobile',
    registered: '12 Jan 2025',
    avatar: 'photo-d',
  },
  {
    id: 10,
    name: 'Aliaksandr Karunny',
    username: 'akarunny@mediacube.io',
    email: 'akarunny@mediacube.io',
    role: 'SEO boost',
    kyc: 'APPROVED',
    lastAction: '26 Aug 2026',
    device: 'desktop',
    registered: '11 Mar 2022',
    avatar: 'default',
  },
  {
    id: 11, name: 'Marta Kowalska', username: 'marta.kowalska@voiceon.ai', email: 'marta.kowalska@voiceon.ai',
    role: 'Content moderator', kyc: 'APPROVED', lastAction: '26 Aug 2026', device: 'desktop',
    registered: '04 Feb 2025', avatar: 'photo-d',
  },
  {
    id: 12, name: 'Giorgi Beridze', username: 'g.beridze@gmail.com', email: 'g.beridze@gmail.com',
    role: null, kyc: 'PENDING', lastAction: '26 Aug 2026', device: 'mobile',
    registered: '25 Aug 2026', avatar: 'photo-b',
  },
  {
    id: 13, name: 'Aigerim Nurlanova', username: 'aigerim@mediacube.io', email: 'aigerim@mediacube.io',
    role: 'Support manager', kyc: 'APPROVED', lastAction: '25 Aug 2026', device: 'desktop',
    registered: '18 Sep 2024', avatar: 'default',
  },
  {
    id: 14, name: 'Lukas Weber', username: 'lukas.weber@outlook.com', email: 'lukas.weber@outlook.com',
    role: null, kyc: null, lastAction: '25 Aug 2026', device: 'mobile',
    registered: '24 Aug 2026', avatar: 'photo-c',
  },
  {
    id: 15, name: 'Beatriz Almeida', username: 'bea.almeida@voiceon.ai', email: 'bea.almeida@voiceon.ai',
    role: 'Studio editor', kyc: 'APPROVED', lastAction: '25 Aug 2026', device: 'desktop',
    registered: '07 May 2025', avatar: 'photo-a',
  },
  {
    id: 16, name: 'Nguyen Minh Anh', username: 'minhanh.nguyen@gmail.com', email: 'minhanh.nguyen@gmail.com',
    role: 'Voice talent', kyc: 'PENDING', lastAction: '24 Aug 2026', device: 'mobile',
    registered: '21 Aug 2026', avatar: 'photo-d',
  },
  {
    id: 17, name: 'Pavel Antonov', username: 'pantonov@mediacube.io', email: 'pantonov@mediacube.io',
    role: 'Payments specialist', kyc: 'APPROVED', lastAction: '24 Aug 2026', device: 'desktop',
    registered: '13 Jun 2023', avatar: 'default',
  },
  {
    id: 18, name: 'Chiara Rossi', username: 'chiara.rossi@voiceon.ai', email: 'chiara.rossi@voiceon.ai',
    role: 'Community manager 2.0', kyc: 'APPROVED', lastAction: '24 Aug 2026', device: 'desktop',
    registered: '02 Oct 2024', avatar: 'photo-a',
  },
  {
    id: 19, name: 'Deniz Yilmaz', username: 'deniz.yilmaz@gmail.com', email: 'deniz.yilmaz@gmail.com',
    role: null, kyc: 'BLOCKED', lastAction: '23 Aug 2026', device: 'mobile',
    registered: '15 Aug 2026', avatar: 'photo-c',
  },
  {
    id: 20, name: 'Olga Sidorova', username: 'osidorova@mediacube.io', email: 'osidorova@mediacube.io',
    role: 'Finance manager', kyc: 'APPROVED', lastAction: '23 Aug 2026', device: 'desktop',
    registered: '29 Jan 2022', avatar: 'default',
  },
  {
    id: 21, name: 'Rahul Mehta', username: 'rahul.mehta@voiceon.ai', email: 'rahul.mehta@voiceon.ai',
    role: 'QA engineer', kyc: 'APPROVED', lastAction: '22 Aug 2026', device: 'desktop',
    registered: '11 Nov 2023', avatar: 'photo-b',
  },
  {
    id: 22, name: 'Sofia Nikolic', username: 's.nikolic@yandex.ru', email: 's.nikolic@yandex.ru',
    role: null, kyc: null, lastAction: '22 Aug 2026', device: 'mobile',
    registered: '20 Aug 2026', avatar: 'photo-d',
  },
  {
    id: 23, name: 'Hanna Melnyk', username: 'hmelnyk@mediacube.io', email: 'hmelnyk@mediacube.io',
    role: 'Partner manager', kyc: 'APPROVED', lastAction: '21 Aug 2026', device: 'desktop',
    registered: '06 Apr 2024', avatar: 'default',
  },
  {
    id: 24, name: 'Tomas Novak', username: 'tomas.novak@outlook.com', email: 'tomas.novak@outlook.com',
    role: null, kyc: 'PENDING', lastAction: '20 Aug 2026', device: 'desktop',
    registered: '19 Aug 2026', avatar: 'photo-c',
  },
  {
    id: 25, name: 'Kristina Petrova', username: 'kpetrova@voiceon.ai', email: 'kpetrova@voiceon.ai',
    role: 'Product designer', kyc: 'APPROVED', lastAction: '19 Aug 2026', device: 'desktop',
    registered: '23 Jul 2024', avatar: 'photo-a',
  },
  {
    id: 26, name: 'Ahmed Al Farsi', username: 'ahmed.alfarsi@gmail.com', email: 'ahmed.alfarsi@gmail.com',
    role: 'Voice talent', kyc: 'APPROVED', lastAction: '18 Aug 2026', device: 'mobile',
    registered: '30 May 2026', avatar: 'photo-b',
  },
  {
    id: 27, name: 'Yulia Kravets', username: 'ykravets@mediacube.io', email: 'ykravets@mediacube.io',
    role: 'Support manager', kyc: 'APPROVED', lastAction: '17 Aug 2026', device: 'desktop',
    registered: '14 Dec 2022', avatar: 'default',
  },
  {
    id: 28, name: 'Carlos Duarte', username: 'carlos.duarte@voiceon.ai', email: 'carlos.duarte@voiceon.ai',
    role: 'Garna Partner (BR)', kyc: 'APPROVED', lastAction: '15 Aug 2026', device: 'desktop',
    registered: '09 Feb 2023', avatar: 'photo-c',
  },
  {
    id: 29, name: 'Somchai Wong', username: 'somchai.w@gmail.com', email: 'somchai.w@gmail.com',
    role: null, kyc: null, lastAction: '12 Aug 2026', device: 'mobile',
    registered: '11 Aug 2026', avatar: 'photo-d',
  },
  {
    id: 30, name: 'Elena Sarkisyan', username: 'esarkisyan@mediacube.io', email: 'esarkisyan@mediacube.io',
    role: 'Community manager 2.0', kyc: 'APPROVED', lastAction: '08 Aug 2026', device: 'desktop',
    registered: '17 Jun 2025', avatar: 'photo-a',
  },
]

const pendingKyc = users.filter((user) => user.kyc === 'PENDING').length

const profileDefaults = {
  gender: '—',
  birthDate: '—',
  country: '—',
  icaDate: '—',
  position: 'Workspace member',
  tags: ['Voiceon'],
  accountLabel: 'Voiceon Internal account',
  balance: '$0.00/€0.00',
  socialAuth: '—',
  password: 'Created',
  twoFactor: null,
  lastActionApp: '—',
  appDevice: 'mobile',
}

const profiles = {
  1: { gender: 'Male', birthDate: '12 Jan 1992 (34 years old)', country: 'Ukraine', icaDate: '30.10.2023', position: 'Product operations', tags: ['Genesis', 'Voiceon'] },
  2: { gender: 'Male', birthDate: '04 Jul 1998 (28 years old)', country: 'Mexico', icaDate: '26.08.2026', position: 'Creator', tags: ['Voiceon'] },
  3: { gender: 'Male', birthDate: '19 Mar 1994 (32 years old)', country: 'Russia', icaDate: '26.08.2026', position: 'Voice talent', tags: ['Approved', 'Voiceon'], twoFactor: '+7 921 000 11 22' },
  4: { gender: 'Female', birthDate: '08 May 1996 (30 years old)', country: 'Belarus', icaDate: '17.04.2024', position: 'Community manager 2.0', tags: ['Community', 'Voiceon'], twoFactor: '+375 29 111 22 33' },
  5: { gender: 'Female', birthDate: '21 Nov 1993 (32 years old)', country: 'Belarus', icaDate: '26.02.2025', position: 'Support manager', tags: ['Support', 'Voiceon'], twoFactor: '+375 29 444 55 66' },
  6: { gender: 'Male', birthDate: '—', country: '—', icaDate: '19.08.2026', position: 'Creator', tags: ['Blocked'] },
  7: { gender: 'Male', birthDate: '02 Apr 1989 (37 years old)', country: 'Belarus', icaDate: '15.11.2021', position: 'Super admin', tags: ['Admin', 'Voiceon'], twoFactor: '+375 29 777 88 99' },
  8: { gender: 'Male', birthDate: '16 Jun 1988 (38 years old)', country: 'Cyprus', icaDate: '03.03.2022', position: 'Garna Partner (CY)', tags: ['Garna', 'Partner'], twoFactor: '+357 99 123 456' },
  9: { gender: 'Female', birthDate: '30 Sep 1997 (28 years old)', country: 'United States', icaDate: '12.01.2025', position: 'Studio editor', tags: ['Studio', 'Voiceon'] },
  10: {
    gender: 'Male',
    birthDate: '25 Sep 1986 (39 years old)',
    country: 'Belarus',
    icaDate: '24.08.2026',
    position: 'Digital Marketing Services',
    tags: ['SEO boost', 'Garna'],
    accountLabel: 'Garna Internal account',
    twoFactor: '+375 29 123 45 67',
    lastActionApp: '24 Aug 2026',
  },
  11: { gender: 'Female', birthDate: '14 Mar 1995 (31 years old)', country: 'Poland', icaDate: '04.02.2025', position: 'Content moderator', tags: ['Support', 'Voiceon'], twoFactor: '+48 512 334 556' },
  12: { gender: 'Male', birthDate: '27 Aug 1999 (27 years old)', country: 'Georgia', icaDate: '25.08.2026', position: 'Creator', tags: ['Voiceon'] },
  13: { gender: 'Female', birthDate: '05 Dec 1996 (29 years old)', country: 'Kazakhstan', icaDate: '18.09.2024', position: 'Support manager', tags: ['Support', 'Voiceon'], twoFactor: '+7 701 223 44 55', balance: '$120.40/€110.85' },
  14: { gender: 'Male', birthDate: '—', country: 'Germany', icaDate: '24.08.2026', position: 'Creator', tags: ['Voiceon'] },
  15: { gender: 'Female', birthDate: '19 Jun 1994 (32 years old)', country: 'Portugal', icaDate: '07.05.2025', position: 'Studio editor', tags: ['Studio', 'Voiceon'], twoFactor: '+351 912 445 778' },
  16: { gender: 'Female', birthDate: '02 Feb 2000 (26 years old)', country: 'Vietnam', icaDate: '21.08.2026', position: 'Voice talent', tags: ['Voiceon'] },
  17: { gender: 'Male', birthDate: '11 Oct 1990 (35 years old)', country: 'Cyprus', icaDate: '13.06.2023', position: 'Payments specialist', tags: ['Fintech', 'Voiceon'], twoFactor: '+357 96 774 112', balance: '$0.00/€2,480.00' },
  18: { gender: 'Female', birthDate: '23 Apr 1993 (33 years old)', country: 'Spain', icaDate: '02.10.2024', position: 'Community manager 2.0', tags: ['Community', 'Voiceon'], twoFactor: '+34 611 998 220' },
  19: { gender: 'Male', birthDate: '—', country: 'Turkey', icaDate: '15.08.2026', position: 'Creator', tags: ['Blocked'] },
  20: { gender: 'Female', birthDate: '08 Jul 1987 (39 years old)', country: 'Belarus', icaDate: '29.01.2022', position: 'Finance manager', tags: ['Fintech', 'Admin'], twoFactor: '+375 29 660 77 88', balance: '$4,310.00/€0.00' },
  21: { gender: 'Male', birthDate: '30 Jan 1992 (34 years old)', country: 'India', icaDate: '11.11.2023', position: 'QA engineer', tags: ['Product', 'Voiceon'], twoFactor: '+91 98200 44112' },
  22: { gender: 'Female', birthDate: '—', country: 'Serbia', icaDate: '20.08.2026', position: 'Creator', tags: ['Voiceon'] },
  23: { gender: 'Female', birthDate: '17 Sep 1991 (34 years old)', country: 'Ukraine', icaDate: '06.04.2024', position: 'Partner manager', tags: ['Garna', 'Partner'], twoFactor: '+380 67 220 11 90' },
  24: { gender: 'Male', birthDate: '25 May 1998 (28 years old)', country: 'Czechia', icaDate: '19.08.2026', position: 'Creator', tags: ['Voiceon'] },
  25: { gender: 'Female', birthDate: '12 Feb 1995 (31 years old)', country: 'Armenia', icaDate: '23.07.2024', position: 'Product designer', tags: ['Product', 'Voiceon'], twoFactor: '+374 91 556 220' },
  26: { gender: 'Male', birthDate: '06 Nov 1989 (36 years old)', country: 'United Arab Emirates', icaDate: '30.05.2026', position: 'Voice talent', tags: ['Approved', 'Voiceon'], balance: '$860.00/€0.00' },
  27: { gender: 'Female', birthDate: '28 Mar 1994 (32 years old)', country: 'Ukraine', icaDate: '14.12.2022', position: 'Support manager', tags: ['Support', 'Voiceon'], twoFactor: '+380 63 118 44 20' },
  28: { gender: 'Male', birthDate: '09 Aug 1986 (40 years old)', country: 'Brazil', icaDate: '09.02.2023', position: 'Garna Partner (BR)', tags: ['Garna', 'Partner'], accountLabel: 'Garna Internal account', twoFactor: '+55 11 96442 8810', balance: '$12,700.00/€0.00' },
  29: { gender: 'Male', birthDate: '—', country: 'Thailand', icaDate: '11.08.2026', position: 'Creator', tags: ['Voiceon'] },
  30: { gender: 'Female', birthDate: '21 Dec 1996 (29 years old)', country: 'Armenia', icaDate: '17.06.2025', position: 'Community manager 2.0', tags: ['Community', 'Voiceon'], twoFactor: '+374 77 330 118' },
}

function getProfile(user) {
  return { ...profileDefaults, lastActionApp: user.lastAction, ...profiles[user.id], ...user }
}

const cardTabs = ['Summary', 'Verification', 'Channels', 'Advance', 'Communication', 'Transactions', 'Revenue']

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatSentDate(value) {
  const date = new Date(value)
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${day} ${monthNames[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

const filterConditions = [
  { key: 'empty', label: 'Empty' },
  { key: 'is', label: 'Is' },
  { key: 'is-not', label: 'Is not' },
]

const titleCase = (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()

const isBlank = (value) =>
  value == null || value === '' || value === '—' || (Array.isArray(value) && value.length === 0)

const yesNo = (flag) => (flag ? 'Yes' : 'No')

function buildFilterFields(rows, defs) {
  return defs.map((field) => {
    const values = new Set()
    rows.forEach((row) => {
      const raw = field.read(row)
      const items = Array.isArray(raw) ? raw : [raw]
      items.forEach((item) => { if (!isBlank(item)) values.add(item) })
    })
    return {
      ...field,
      options: [...values].sort().map((value) => ({
        value,
        label: field.format ? field.format(value) : value,
      })),
    }
  })
}

const userFilterFields = buildFilterFields(users, [
  { key: 'role', label: 'Role', read: (user) => user.role },
  { key: 'kyc', label: 'KYC status', read: (user) => user.kyc, format: titleCase },
  { key: 'country', label: 'Country', read: (user) => getProfile(user).country },
  { key: 'position', label: 'Position', read: (user) => getProfile(user).position },
  { key: 'device', label: 'Last action device', read: (user) => user.device, format: titleCase },
  { key: 'tag', label: 'Label', read: (user) => getProfile(user).tags },
  { key: 'registered', label: 'Registration year', read: (user) => user.registered.slice(-4) },
])

const notificationFilterFields = buildFilterFields(notifications, [
  { key: 'sender', label: 'Sender', read: (item) => item.sender },
  { key: 'segment', label: 'Segment', read: (item) => item.segment },
  { key: 'push', label: 'Push', read: (item) => yesNo(item.push) },
  { key: 'sent', label: 'Sent', read: (item) => item.sent, format: formatSentDate },
])

const promotionFilterFields = buildFilterFields(promotions, [
  { key: 'segment', label: 'Segment', read: (item) => item.segment },
  { key: 'countries', label: 'Countries', read: (item) => item.countries },
  { key: 'leadsTo', label: 'Button leads to', read: (item) => item.leadsTo },
  { key: 'endDate', label: 'End date', read: (item) => item.endDate },
  { key: 'updated', label: 'Date of last update', read: (item) => item.updated },
])

const labelFilterFields = buildFilterFields(labels, [
  { key: 'csp', label: 'CSP', read: (item) => item.csp },
  { key: 'domain', label: 'Domain name', read: (item) => item.domain },
  { key: 'app', label: 'Presence of app', read: (item) => yesNo(item.app) },
])

const transactionFilterFields = buildFilterFields(transactions, [
  { key: 'status', label: 'Status', read: (item) => item.status, format: titleCase },
  { key: 'express', label: 'Expresses', read: (item) => yesNo(item.express) },
  { key: 'method', label: 'Payment method', read: (item) => item.method },
  { key: 'created', label: 'Date of creation', read: (item) => item.created, format: formatSentDate },
  { key: 'flagged', label: 'Requires clarification', read: (item) => yesNo(item.flagged) },
])

function matchesFilter(row, filter, fields) {
  const field = fields.find((item) => item.key === filter.field)
  if (!field) return true
  const raw = field.read(row)
  if (filter.condition === 'empty') return isBlank(raw)
  const hit = Array.isArray(raw) ? raw.includes(filter.value) : raw === filter.value
  return filter.condition === 'is' ? hit : !hit
}

function describeFilter(filter, fields) {
  const field = fields.find((item) => item.key === filter.field)
  const option = field?.options.find((item) => item.value === filter.value)
  return {
    condition: filterConditions.find((item) => item.key === filter.condition)?.label ?? '',
    field: field?.label ?? filter.field,
    value: option?.label ?? filter.value,
  }
}

const sameFilters = (a, b) =>
  a.length === b.length &&
  a.every((item, index) =>
    item.field === b[index].field && item.condition === b[index].condition && item.value === b[index].value)

function loadPresets(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function useFilters(fields, storageKey) {
  const [panelOpen, setPanelOpen] = useState(false)
  const [draft, setDraft] = useState([])
  const [applied, setApplied] = useState([])
  const [field, setField] = useState('')
  const [condition, setCondition] = useState('is')
  const [value, setValue] = useState('')
  const [presets, setPresets] = useState(() => loadPresets(storageKey))
  const [activePresetId, setActivePresetId] = useState(null)
  const [presetName, setPresetName] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(presets))
    } catch {
      // storage unavailable — presets stay in memory for this session
    }
  }, [storageKey, presets])

  const addFilter = (nextField, nextCondition, nextValue) => {
    setDraft((current) => {
      const exists = current.some((item) =>
        item.field === nextField && item.condition === nextCondition && item.value === nextValue)
      if (exists) return current
      const id = `${nextField}-${nextCondition}-${nextValue}-${current.length}-${Date.now()}`
      return [...current, { id, field: nextField, condition: nextCondition, value: nextValue }]
    })
  }

  const togglePreset = (preset) => {
    if (activePresetId === preset.id) {
      setActivePresetId(null)
      setDraft([])
      setApplied([])
      return
    }
    setActivePresetId(preset.id)
    setDraft(preset.filters)
    setApplied(preset.filters)
    setPanelOpen(true)
  }

  const deletePreset = (id) => {
    setPresets((current) => current.filter((item) => item.id !== id))
    if (activePresetId === id) setActivePresetId(null)
  }

  const apply = (rows) => rows.filter((row) => applied.every((item) => matchesFilter(row, item, fields)))

  return {
    apply,
    applied,
    activeCount: applied.length,
    panelOpen,
    setPanelOpen,
    presets,
    activePresetId,
    togglePreset,
    deletePreset,
    panelProps: {
      fields,
      draft,
      field,
      condition,
      value,
      activePreset: presets.find((item) => item.id === activePresetId),
      applyDisabled: sameFilters(draft, applied),
      presetName,
      onFieldChange: (next) => {
        setField(next)
        setValue('')
        if (next && condition === 'empty') addFilter(next, 'empty', '')
      },
      onConditionChange: (next) => {
        setCondition(next)
        setValue('')
        if (field && next === 'empty') addFilter(field, 'empty', '')
      },
      onValueChange: (next) => { if (next) addFilter(field, condition, next) },
      onRemove: (id) => setDraft((current) => current.filter((item) => item.id !== id)),
      onClear: () => setDraft([]),
      onClose: () => setPanelOpen(false),
      onApply: () => setApplied(draft),
      onPresetNameChange: setPresetName,
      onSavePreset: () => {
        const preset = { id: `preset-${Date.now()}`, name: presetName.trim(), filters: draft }
        setPresets((current) => [...current, preset])
        setActivePresetId(preset.id)
        setPresetName('')
      },
      onDeletePreset: () => deletePreset(activePresetId),
    },
  }
}

function findNavGroup(label) {
  return navItems.find((item) => item.children?.some((child) => child.label === label))?.label
}

function Sidebar({ open, onClose, active, setActive }) {
  const [openGroups, setOpenGroups] = useState(() => ({ [findNavGroup(active) ?? 'Administrator']: true }))
  const go = (label) => { setActive(label); onClose() }
  const toggleGroup = (label) =>
    setOpenGroups((current) => ({ ...current, [label]: !current[label] }))

  return (
    <>
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand-row">
          <strong className="brand">Dashboard</strong>
          <button className="icon-button close-sidebar" onClick={onClose} aria-label="Close menu"><X size={18} /></button>
        </div>
        <nav>
          <p className="nav-title">Sections</p>

          {navItems.map(({ label, icon: Icon, dot, arrow, children }) => (
            children ? (
              <div key={label}>
                <button className="nav-item nav-group-toggle" onClick={() => toggleGroup(label)}>
                  <Icon size={17} strokeWidth={1.5} /><span>{label}</span>
                  {dot && <span className="nav-dot" />}
                  <ChevronDown size={14} className={`nav-arrow ${openGroups[label] ? 'open' : ''}`} />
                </button>
                {openGroups[label] && (
                  <div className="nav-subitems">
                    {children.map((child) => (
                      <button
                        key={child.label}
                        className={`nav-item nav-subitem ${active === child.label ? 'active' : ''}`}
                        onClick={() => go(child.label)}
                      >
                        <span>{child.label}</span>
                        {child.badge && <small>{child.badge}</small>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button key={label} className={`nav-item ${active === label ? 'active' : ''}`}
                onClick={() => go(label)}>
                <Icon size={17} strokeWidth={1.5} /><span>{label}</span>
                {dot && <span className="nav-dot" />}
                {arrow && <ChevronRight size={14} className="nav-arrow" />}
              </button>
            )
          ))}
        </nav>
        <button className="mc-pay-button" onClick={() => alert('Opening MC Pay...')}>
          <span className="mc-pay-icon"><Zap size={13} /></span>
          <span>MC Pay</span>
          <ExternalLink size={14} />
        </button>
      </aside>
      {open && <button className="backdrop" onClick={onClose} aria-label="Close menu" />}
    </>
  )
}

function UserAvatar({ name, variant, size = 'sm' }) {
  const iconSize = size === 'lg' ? 48 : 22
  if (variant?.startsWith('photo')) {
    return <span className={`user-avatar photo ${variant} ${size}`}>{name.slice(0, 1)}</span>
  }
  return (
    <span className={`user-avatar placeholder ${size}`}>
      <UserRound size={iconSize} strokeWidth={1.5} fill="currentColor" />
    </span>
  )
}

function Field({ label, children }) {
  return (
    <div className="profile-field">
      <span>{label}</span>
      <strong>{children}</strong>
    </div>
  )
}

function UserCard({ user, onBack }) {
  const [tab, setTab] = useState('Summary')
  const profile = getProfile(user)

  return (
    <section className="panel user-card">
      <div className="user-card-nav">
        <button className="text-link" onClick={onBack}><ChevronLeft size={15} /> Back to list</button>
        <div className="user-card-actions">
          <button className="text-link"><RefreshCw size={14} /> To company</button>
          <button className="text-link"><Plus size={14} /> Add channel</button>
          <button className="text-link"><Pencil size={14} /> Edit data</button>
          <button className="text-link"><Clock size={14} /> History</button>
          <button className="text-link"><MessageCircle size={14} /> Chat</button>
        </div>
      </div>

      <div className="user-card-hero">
        <UserAvatar name={profile.name} variant={profile.avatar} size="lg" />
        <div className="user-card-identity">
          <div className="user-card-name">
            <h2>{profile.name}</h2>
            {profile.kyc && <span className={`kyc-pill ${profile.kyc.toLowerCase()}`}>{profile.kyc}</span>}
          </div>
          <p className="user-card-meta">
            <span className="email-verified">
              {profile.email}
              {profile.kyc === 'APPROVED' && <Check size={13} />}
            </span>
            <span className="profile-tags">
              {profile.tags.map((tag) => <span key={tag} className="profile-tag">{tag}</span>)}
            </span>
          </p>
        </div>
        <div className="user-card-balance">
          <span>{profile.accountLabel}</span>
          <strong>{profile.balance}</strong>
        </div>
      </div>

      <div className="user-card-tabs">
        {cardTabs.map((item) => (
          <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}</button>
        ))}
      </div>

      {tab === 'Summary' ? (
        <div className="profile-cards">
          <div className="profile-card">
            <h3>Personal information</h3>
            <div className="profile-grid">
              <Field label="Gender">{profile.gender}</Field>
              <Field label="Birth date">{profile.birthDate}</Field>
              <Field label="Country">{profile.country}</Field>
              <Field label="Date of ICA signing">{profile.icaDate}</Field>
              <Field label="Position">{profile.position}</Field>
            </div>
          </div>

          <div className="profile-card">
            <div className="profile-section-head">
              <h3>Account details and settings</h3>
              <button className="ghost-danger">Disable 2FA</button>
            </div>
            <div className="profile-grid">
              <Field label="Authorization via social networks">{profile.socialAuth}</Field>
              <Field label="Account password">{profile.password}</Field>
              <Field label="Two-Factor Authentication">
                {profile.twoFactor ? (
                  <span className="tf-value">{profile.twoFactor} <Check size={13} /></span>
                ) : '—'}
              </Field>
            </div>
          </div>

          <div className="profile-card">
            <h3>Activity</h3>
            <div className="profile-grid">
              <Field label="Registration date">{profile.registered}</Field>
              <Field label="Last action">
                <span className="action-cell">
                  {profile.lastAction}
                  {profile.device === 'mobile' ? <Smartphone size={14} /> : <Monitor size={14} />}
                </span>
              </Field>
              <Field label="Last action in the app">
                <span className="action-cell">
                  {profile.lastActionApp}
                  <Smartphone size={14} />
                </span>
              </Field>
            </div>
          </div>

          <div className="profile-card">
            <div className="profile-section-head">
              <h3>Roles</h3>
              <button className="icon-button" aria-label="Edit roles"><Pencil size={14} /></button>
            </div>
            {profile.role ? <span className="role-pill">{profile.role}</span> : <p className="muted">No roles assigned</p>}
          </div>

          <div className="profile-card">
            <div className="profile-section-head">
              <h3>Fintech</h3>
              <button className="icon-button" aria-label="Edit fintech"><Pencil size={14} /></button>
            </div>
            <p className="muted">No fintech settings</p>
          </div>
        </div>
      ) : (
        <div className="profile-empty">No {tab.toLowerCase()} data yet.</div>
      )}
    </section>
  )
}

function FilterSelect({ value, onChange, placeholder, options, disabled }) {
  return (
    <div className={`filter-select ${disabled ? 'disabled' : ''}`}>
      <select value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <ChevronDown size={14} />
    </div>
  )
}

function FilterBar({ filters }) {
  const anchor = useRef(null)
  const { panelOpen, setPanelOpen } = filters

  useEffect(() => {
    if (!panelOpen) return undefined
    const onPointerDown = (event) => {
      if (!anchor.current?.contains(event.target)) setPanelOpen(false)
    }
    const onKeyDown = (event) => { if (event.key === 'Escape') setPanelOpen(false) }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [panelOpen, setPanelOpen])

  return (
    <>
      <div className="filter-anchor" ref={anchor}>
        <button
          className={`icon-button users-filter ${panelOpen || filters.activeCount > 0 ? 'active' : ''}`}
          onClick={() => setPanelOpen((current) => !current)}
          aria-label="Filters"
          aria-expanded={panelOpen}
        >
          <SlidersHorizontal size={16} />
          {filters.activeCount > 0 && <span className="filter-count">{filters.activeCount}</span>}
        </button>
        {panelOpen && <FiltersPanel {...filters.panelProps} />}
      </div>
      {filters.presets.map((preset) => (
        <span key={preset.id} className={`preset-chip ${filters.activePresetId === preset.id ? 'active' : ''}`}>
          <button className="preset-chip-label" onClick={() => filters.togglePreset(preset)}>{preset.name}</button>
          <button
            className="preset-chip-remove"
            onClick={() => filters.deletePreset(preset.id)}
            aria-label={`Delete preset ${preset.name}`}
          >
            <X size={11} />
          </button>
        </span>
      ))}
    </>
  )
}

function FiltersPanel({
  fields, draft, field, condition, value, activePreset,
  onFieldChange, onConditionChange, onValueChange, onRemove, onClear, onClose,
  onApply, applyDisabled, presetName, onPresetNameChange, onSavePreset, onDeletePreset,
}) {
  const currentField = fields.find((item) => item.key === field)
  const valueDisabled = !currentField || condition === 'empty'

  return (
    <section className="filters-panel" role="dialog" aria-label="Filters">
      <header className="filters-head">
        <h3>Filters {draft.length > 0 && <small>{draft.length}</small>}</h3>
        <button className="icon-button" onClick={onClose} aria-label="Close filters"><X size={16} /></button>
      </header>

      <div className="filters-row">
        <label className="filters-control">
          <span>Field</span>
          <FilterSelect
            value={field}
            onChange={onFieldChange}
            placeholder="Select a field"
            options={fields.map((item) => ({ value: item.key, label: item.label }))}
          />
        </label>

        <div className="filters-control">
          <span>Condition</span>
          <div className="segmented">
            {filterConditions.map((item) => (
              <button
                key={item.key}
                className={condition === item.key ? 'active' : ''}
                onClick={() => onConditionChange(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <label className="filters-control">
          <span>Value</span>
          <FilterSelect
            value={value}
            onChange={onValueChange}
            placeholder={condition === 'empty' ? 'Not needed for “Empty”' : 'Select a value'}
            options={currentField?.options ?? []}
            disabled={valueDisabled}
          />
        </label>
      </div>

      <div className="filters-added">
        <div className="filters-added-head">
          <span>Added filters</span>
          {draft.length > 0 && (
            <button className="text-link filters-clear" onClick={onClear}>Clear all</button>
          )}
        </div>
        {draft.length > 0 ? (
          <div className="filters-chip-list">
            {draft.map((item) => {
              const parts = describeFilter(item, fields)
              return (
                <span className="filter-chip" key={item.id}>
                  <b>{parts.condition}</b>
                  <span>{parts.field}{item.condition !== 'empty' && <strong>: {parts.value}</strong>}</span>
                  <button onClick={() => onRemove(item.id)} aria-label="Remove filter"><X size={11} /></button>
                </span>
              )
            })}
          </div>
        ) : (
          <p className="filters-empty">No filters added yet</p>
        )}
      </div>

      <footer className="filters-footer">
        <button className="primary-button" onClick={onApply} disabled={applyDisabled}>Apply filters</button>
        {activePreset && (
          <button className="ghost-danger" onClick={onDeletePreset}>
            <Trash2 size={13} /> Delete “{activePreset.name}”
          </button>
        )}
      </footer>

      <div className="filters-preset">
        <input
          value={presetName}
          onChange={(event) => onPresetNameChange(event.target.value)}
          placeholder="Preset name"
        />
        <button
          className="secondary-button"
          onClick={onSavePreset}
          disabled={!presetName.trim() || draft.length === 0}
        >
          Save
        </button>
      </div>
      {draft.length === 0 && (
        <p className="filters-preset-hint">Add at least one filter above before saving a preset.</p>
      )}
    </section>
  )
}

function UsersPage() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const filters = useFilters(userFilterFields, 'voiceon.users.filter-presets')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const matched = users.filter((user) => !q || [user.name, user.username, user.email, user.role]
      .filter(Boolean)
      .some((item) => item.toLowerCase().includes(q)))
    return filters.apply(matched)
  }, [query, filters.applied])

  const selected = users.find((user) => user.id === selectedId)
  const detailOpen = Boolean(selected)

  return (
    <div className="users-page">
      <HeaderTools>
        <label className="users-search">
          <Search size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Username, channel or email"
          />
        </label>
        <FilterBar filters={filters} />
        <div className="users-toolbar-actions">
          <button className="kyc-button">
            <ScanFace size={15} />
            Checking KYC
            <span>{pendingKyc}</span>
          </button>
          <button className="icon-button toolbar-outline-button" aria-label="Export"><Download size={16} /></button>
          <button className="icon-button toolbar-outline-button" aria-label="Columns"><Columns3 size={16} /></button>
        </div>
      </HeaderTools>


      <section className="panel users-panel">
        <div className="users-table-wrap">
          <table className="users-table">
            <thead>
              <tr>
                <th>
                  <span className="th-user">
                    User
                    <small>{filtered.length.toLocaleString('en-US')}</small>
                  </span>
                </th>
                <th>email</th>
                <th>Role</th>
                <th>KYC status</th>
                <th>
                  <span className="th-sort">Last action <ArrowDownUp size={11} /></span>
                </th>
                <th>
                  <span className="th-sort">Registration date <ArrowDownUp size={11} /></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className={selectedId === user.id ? 'selected' : ''}
                  onClick={() => setSelectedId(user.id)}
                >
                  <td>
                    <div className="user-cell">
                      <UserAvatar name={user.name} variant={user.avatar} />
                      <div>
                        <strong>{user.name}</strong>
                        <small>{user.username}</small>
                      </div>
                    </div>
                  </td>
                  <td className="email-cell">{user.email}</td>
                  <td>
                    {user.role ? <span className="role-pill">{user.role}</span> : <span className="empty-cell">—</span>}
                  </td>
                  <td>
                    {user.kyc ? (
                      <span className={`kyc-pill ${user.kyc.toLowerCase()}`}>{user.kyc}</span>
                    ) : (
                      <span className="empty-cell">—</span>
                    )}
                  </td>
                  <td>
                    <span className="action-cell">
                      {user.lastAction}
                      {user.device === 'mobile'
                        ? <Smartphone size={14} strokeWidth={2} />
                        : <Monitor size={14} strokeWidth={2} />}
                    </span>
                  </td>
                  <td>{user.registered}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="users-empty">No users match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {detailOpen && (
        <div className="user-drawer-backdrop" onMouseDown={() => setSelectedId(null)}>
          <div className="user-drawer" onMouseDown={(event) => event.stopPropagation()}>
            <UserCard user={selected} onBack={() => setSelectedId(null)} />
          </div>
        </div>
      )}
    </div>
  )
}

function NotificationsPage({ draft, setDraft }) {
  const [query, setQuery] = useState('')
  const [descending, setDescending] = useState(true)
  const filters = useFilters(notificationFilterFields, 'voiceon.notifications.filter-presets')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const matched = q
      ? notifications.filter((item) =>
        [item.sender, item.email, item.title, item.preview].some((field) => field.toLowerCase().includes(q)))
      : notifications
    return [...filters.apply(matched)].sort((a, b) =>
      descending ? b.sent.localeCompare(a.sent) : a.sent.localeCompare(b.sent))
  }, [query, descending, filters.applied])

  return (
    <div className="users-page">
      <HeaderTools>
        <label className="users-search">
          <Search size={16} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Username or email"
          />
        </label>
        <FilterBar filters={filters} />
        <button className="archive-button toolbar-archive"><Archive size={16} /> Archive</button>
      </HeaderTools>


      <section className="panel users-panel">
        <div className="users-table-wrap">
          <table className="users-table notifications-table">
            <thead>
              <tr>
                <th>
                  <span className="th-user">
                    Sender
                    <small>{visible.length.toLocaleString('en-US')}</small>
                  </span>
                </th>
                <th>Segment</th>
                <th>Push</th>
                <th>Message</th>
                <th>
                  <button className="th-sort th-sort-button" onClick={() => setDescending((value) => !value)}>
                    {descending ? <ArrowDown size={12} /> : <ArrowUp size={12} />} Sent
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((item) => (
                <tr key={item.id} className="clickable-row" onClick={() => setDraft(item)}>
                  <td>
                    <div className="user-cell">
                      <UserAvatar name={item.sender} variant={item.avatar} />
                      <div>
                        <strong>{item.sender}</strong>
                        <small>{item.email}</small>
                      </div>
                    </div>
                  </td>
                  <td><span className="role-pill">{item.segment}</span></td>
                  <td>
                    {item.push
                      ? <CircleCheck size={17} strokeWidth={1.5} className="push-sent" />
                      : <span className="empty-cell">—</span>}
                  </td>
                  <td>
                    <div className="message-cell">
                      <strong>{item.title}</strong>
                      <small>{item.preview}</small>
                    </div>
                  </td>
                  <td className="sent-cell">{formatSentDate(item.sent)}</td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={5} className="users-empty">No notifications match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {draft !== undefined && (
        <NotificationModal notification={draft} onClose={() => setDraft(undefined)} />
      )}
    </div>
  )
}

const money = (value) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`

function TransactionsPage({ region }) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState({ key: 'created', dir: 'desc' })
  const filters = useFilters(transactionFilterFields, 'voiceon.transactions.filter-presets')

  const toggleSort = (key) =>
    setSort((current) => ({ key, dir: current.key === key && current.dir === 'desc' ? 'asc' : 'desc' }))

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const matched = q
      ? transactions.filter((item) =>
        [item.user, item.method, item.status].some((field) => field.toLowerCase().includes(q)))
      : transactions
    return [...filters.apply(matched)].sort((a, b) => {
      const [left, right] = sort.dir === 'desc' ? [b, a] : [a, b]
      const value = left[sort.key]
      return typeof value === 'number' ? value - right[sort.key] : String(value).localeCompare(String(right[sort.key]))
    })
  }, [query, sort, filters.applied])

  const total = visible.reduce((sum, item) => sum + item.amount, 0)

  const SortHeader = ({ label, sortKey, hint }) => (
    <button className="th-sort th-sort-button" onClick={() => toggleSort(sortKey)}>
      {sort.key === sortKey
        ? (sort.dir === 'desc' ? <ArrowDown size={12} /> : <ArrowUp size={12} />)
        : <ArrowUpDown size={12} className="th-sort-idle" />}
      {label}
      {hint && <CircleHelp size={12} className="th-hint" />}
    </button>
  )

  return (
    <div className="users-page">
      <HeaderTools>
        <label className="users-search">
          <Search size={16} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Username / Email / Account Number"
          />
        </label>
        <FilterBar filters={filters} />
        <div className="users-toolbar-actions">
          {transactionStats.map(({ label, icon: Icon, count }) => (
            <button className="count-button" key={label}>
              <Icon size={15} strokeWidth={1.7} />
              {label}
              <span>{count}</span>
            </button>
          ))}
          <button className="icon-button toolbar-outline-button" aria-label="Export"><FileDown size={16} /></button>
        </div>
      </HeaderTools>


      <section className="panel users-panel">
        <div className="users-table-wrap">
          <table className="users-table transactions-table">
            <thead>
              <tr>
                <th>
                  <span className="th-user">
                    User
                    <small>{visible.length.toLocaleString('en-US')}</small>
                  </span>
                </th>
                <th><SortHeader label="Status" sortKey="status" /></th>
                <th>
                  <span className="th-sort">Expresses <CircleHelp size={12} className="th-hint" /></span>
                </th>
                <th><SortHeader label="Date of creation" sortKey="created" /></th>
                <th><SortHeader label="Updated at" sortKey="updated" /></th>
                <th><SortHeader label="Payment method" sortKey="method" hint /></th>
                <th className="amount-column"><SortHeader label="Amount" sortKey="amount" /></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((item) => (
                <tr key={item.id} className="clickable-row">
                  <td>
                    <div className="user-cell transaction-user">
                      <UserAvatar name={item.user} variant={item.avatar} />
                      <strong>{item.user}</strong>
                      {item.flagged && <Info size={14} className="flagged-icon" />}
                    </div>
                  </td>
                  <td><span className={`status-pill ${item.status.toLowerCase()}`}>{item.status}</span></td>
                  <td>{item.express ? 'Yes' : 'No'}</td>
                  <td className="sent-cell">{formatSentDate(item.created)}</td>
                  <td className="sent-cell">{formatSentDate(item.updated)}</td>
                  <td>
                    <span className={`method-cell ${item.methodLink ? 'link' : ''}`}>{item.method}</span>
                  </td>
                  <td className="amount-column">{money(item.amount)}</td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={7} className="users-empty">No transactions match your search.</td>
                </tr>
              )}
            </tbody>
            {visible.length > 0 && (
              <tfoot>
                <tr>
                  <td colSpan={6}>Total{region ? ` · ${region}` : ''}</td>
                  <td className="amount-column">{money(total)}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </section>
    </div>
  )
}

const notificationLanguages = ['EN', 'RU', 'ES', 'PT', 'TH', 'AR', 'VI']
const notificationChannels = ['Notification', 'Push']
const notificationVariables = '{user_name}, {credits_amount}, {funds_amount}, {balance_amount}'
const emptyContent = { title: '', text: '' }

function CountedField({ label, value, onChange, placeholder, limit, rows }) {
  return (
    <label className="form-field">
      <span>{label}</span>
      <div className="counted-field">
        <textarea
          value={value}
          rows={rows}
          maxLength={limit}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
        <small>{value.length}/{limit}</small>
      </div>
      <p className="field-hint">Variables – {notificationVariables}</p>
    </label>
  )
}

function NotificationModal({ notification, onClose }) {
  const isEditing = Boolean(notification)
  const [language, setLanguage] = useState('EN')
  const [channel, setChannel] = useState('Notification')
  const [content, setContent] = useState(() => (
    notification
      ? { 'EN-Notification': { title: notification.title, text: notification.preview } }
      : {}
  ))
  const [articleFormat, setArticleFormat] = useState(false)
  const [addButton, setAddButton] = useState(false)
  const [important, setImportant] = useState(false)

  const key = `${language}-${channel}`
  const draft = content[key] ?? emptyContent
  const patch = (changes) => setContent((current) => ({ ...current, [key]: { ...draft, ...changes } }))
  const incomplete = !draft.title.trim()

  return (
    <div className="side-modal-backdrop" onMouseDown={onClose}>
      <aside className="side-modal" onMouseDown={(event) => event.stopPropagation()}>
        <header>
          <h2>{isEditing ? 'Edit notification or article' : 'Create a notification or article'}</h2>
          <button className="icon-button" onClick={onClose} aria-label="Close notification"><X size={18} /></button>
        </header>

        <div className="modal-form">
          <section className="modal-section">
            <h3>Add segment by users</h3>
            <div className="form-row-with-button">
              <div className="form-input">
                <input placeholder="Usernames or email addresses" readOnly />
                <ChevronDown size={14} />
              </div>
              <button className="outline-icon-button" type="button"><FilePlus2 size={18} /></button>
            </div>
          </section>

          <section className="modal-section">
            <h3>Add segment label and CSP</h3>
            <FormField label="Label" placeholder="Select labels" />
            <FormField label="CSP" placeholder="Select a CSP" />
            <FormField label="Exclude CSP" placeholder="Select a CSP" />
            <div className="form-row-with-button">
              <FormField label="Narrow segment by country" placeholder="Users from selected countries in the segment will see the content" />
              <button className="outline-icon-button field-side-button" type="button"><FilePlus2 size={18} /></button>
            </div>
          </section>

          <section className="modal-section">
            <div className="language-tabs">
              {notificationLanguages.map((item) => (
                <button key={item} className={item === language ? 'active' : ''} onClick={() => setLanguage(item)}>
                  {item}
                </button>
              ))}
            </div>
            <div className="segmented channel-tabs">
              {notificationChannels.map((item) => (
                <button key={item} className={item === channel ? 'active' : ''} onClick={() => setChannel(item)}>
                  {item}
                </button>
              ))}
            </div>

            <CountedField
              label={`${channel} title`}
              value={draft.title}
              onChange={(value) => patch({ title: value })}
              placeholder="Recommended length is up to 70 characters"
              limit={100}
              rows={2}
            />
            <CountedField
              label={`${channel} text`}
              value={draft.text}
              onChange={(value) => patch({ text: value })}
              placeholder="Recommended length is up to 200 characters"
              limit={500}
              rows={3}
            />

            <div className="toggle-list">
              <label className="toggle-row">
                <input type="checkbox" checked={articleFormat} onChange={(event) => setArticleFormat(event.target.checked)} />
                <span className="toggle" />
                Article format
              </label>
              <label className="toggle-row">
                <input type="checkbox" checked={addButton} onChange={(event) => setAddButton(event.target.checked)} />
                <span className="toggle" />
                Add a button
              </label>
              <label className="toggle-row">
                <input type="checkbox" checked={important} onChange={(event) => setImportant(event.target.checked)} />
                <span className="toggle" />
                Mark notification as important
              </label>
            </div>
          </section>
        </div>

        <footer>
          <button className="primary-button" onClick={onClose}>{isEditing ? 'Save changes' : 'Create'}</button>
          <button className="secondary-button" disabled={incomplete}>Preview</button>
          <button className="secondary-button" disabled={incomplete} onClick={onClose}>Save draft</button>
        </footer>
      </aside>
    </div>
  )
}

function FormField({ label, placeholder, type = 'select', icon: Icon }) {
  return (
    <label className="form-field">
      <span>{label}</span>
      <div className="form-input">
        {Icon && <Icon size={16} />}
        <input placeholder={placeholder} readOnly />
        {type === 'select' && <ChevronDown size={14} />}
      </div>
    </label>
  )
}

function PromotionUpload({ title, size }) {
  return (
    <div className="promotion-upload-group">
      <span>{title}</span>
      <button className="promotion-upload" type="button">
        <ImagePlus size={27} strokeWidth={1.8} />
        <small>Photos up to 10 MB, .jpeg, .jpg, .png formats.</small>
        <small>Max number of photos is 1. Required image size: {size}</small>
        <b>Add Files</b>
      </button>
    </div>
  )
}

function PromotionModal({ promotion, onClose }) {
  const isEditing = Boolean(promotion)
  const [title, setTitle] = useState(promotion?.name ?? '')
  const [reminder, setReminder] = useState(false)

  return (
    <div className="side-modal-backdrop" onMouseDown={onClose}>
      <aside className="side-modal" onMouseDown={(event) => event.stopPropagation()}>
        <header>
          <h2>{isEditing ? 'Edit promotion' : 'Create a promotion'}</h2>
          <button className="icon-button" onClick={onClose} aria-label="Close promotion"><X size={18} /></button>
        </header>

        <div className="modal-form">
          <section className="modal-section">
            <h3>Add segment by users</h3>
            <div className="form-row-with-button">
              <div className="form-input">
                <input placeholder="Usernames or email addresses" readOnly />
                <ChevronDown size={14} />
              </div>
              <button className="outline-icon-button" type="button"><FilePlus2 size={18} /></button>
            </div>
          </section>

          <section className="modal-section">
            <h3>Add segment label and CSP</h3>
            <FormField label="Label" placeholder="Select labels" />
            <FormField label="CSP" placeholder="Select a CSP" />
            <FormField label="Exclude CSP" placeholder="Select a CSP" />
            <div className="form-row-with-button">
              <FormField label="Narrow segment by country" placeholder="Users from selected countries in the segment will…" />
              <button className="outline-icon-button field-side-button" type="button"><FilePlus2 size={18} /></button>
            </div>
          </section>

          <section className="modal-section modal-section-grid">
            <FormField label="Serial number of the promotion" placeholder={String(promotion?.id ?? promotions.length + 1)} type="input" />
            <FormField label="Platforms" placeholder="Where the promotion will show" />
            <FormField label="Button leads to" placeholder={promotion?.leadsTo ?? 'Balance'} />
            <FormField label="End date (optional)" placeholder={promotion?.endDate === '—' ? 'End of the promotion' : promotion?.endDate ?? 'End of the promotion'} type="input" icon={CalendarDays} />
          </section>

          <section className="modal-section reminder-row">
            <p>File with examples of segments and transitions</p>
            <label className="toggle-row">
              <input type="checkbox" checked={reminder} onChange={(event) => setReminder(event.target.checked)} />
              <span className="toggle" />
              Add a reminder
              <small>?</small>
            </label>
          </section>

          <section className="modal-section promotion-copy">
            <div className="language-tabs">
              {['EN', 'RU', 'ES', 'PT', 'TH', 'AR', 'VI'].map((language) => <button className={language === 'EN' ? 'active' : ''} key={language}>{language}</button>)}
            </div>
            <label className="form-field">
              <span>Promotion title <small>?</small></span>
              <input className="standalone-input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Recommended length is up to 95 characters" />
            </label>
            <label className="form-field">
              <span>Promotion text in the modal window</span>
              <textarea placeholder="Tell users about the promotion" defaultValue={isEditing ? 'Discover this offer and unlock more opportunities in your Voiceon workspace.' : ''} />
              <div className="editor-toolbar">Normal ↕　≡　≣　☰　❞　<b>B</b>　<i>I</i>　<u>U</u>　☷　🔗　▧</div>
            </label>
            <label className="form-field">
              <span>Text on a button in the modal window</span>
              <input className="standalone-input" placeholder="Recommended length is up to 25 characters" defaultValue={isEditing ? 'Learn more' : ''} />
            </label>
          </section>

          <section className="modal-section promotion-assets">
            <PromotionUpload title="Banner for web version" size="720x600 px" />
            <PromotionUpload title="Banner for app" size="1372x440 px" />
            <PromotionUpload title="Image for modal window" size="1744x800 px" />
          </section>
        </div>

        <footer>
          <button className="primary-button" onClick={onClose}>{isEditing ? 'Save changes' : 'Publish'}</button>
          <button className="secondary-button" onClick={onClose}>Save draft</button>
        </footer>
      </aside>
    </div>
  )
}

function PromotionsPage({ draft, setDraft }) {
  const [query, setQuery] = useState('')
  const filters = useFilters(promotionFilterFields, 'voiceon.promotions.filter-presets')

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim()
    const matched = normalized
      ? promotions.filter((promotion) => promotion.name.toLowerCase().includes(normalized))
      : promotions
    return filters.apply(matched)
  }, [query, filters.applied])

  return (
    <div className="promotions-page">
      <HeaderTools>
        <label className="users-search">
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Banner name" />
        </label>
        <FilterBar filters={filters} />
        <button className="archive-button toolbar-archive"><Archive size={16} /> Archive</button>
      </HeaderTools>


      <section className="panel promotions-panel">
        <div className="promotions-table-wrap">
          <table className="promotions-table">
            <thead>
              <tr>
                <th><span className="th-user">Banner name <small>{filtered.length}</small></span></th>
                <th>Segment</th>
                <th>Countries</th>
                <th>Button leads to</th>
                <th><span className="th-sort">End date <ArrowDownUp size={11} /></span></th>
                <th><span className="th-sort">Date of last update <ArrowDownUp size={11} /></span></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((promotion) => (
                <tr key={promotion.id} onClick={() => setDraft(promotion)}>
                  <td><strong>{promotion.name}</strong></td>
                  <td><span className="role-pill">{promotion.segment}</span></td>
                  <td><span className="role-pill">{promotion.countries}</span></td>
                  <td>{promotion.leadsTo}</td>
                  <td>{promotion.endDate}</td>
                  <td>{promotion.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {draft !== undefined && <PromotionModal promotion={draft} onClose={() => setDraft(undefined)} />}
    </div>
  )
}

function LabelModal({ label, onClose }) {
  const isEditing = Boolean(label)
  const [name, setName] = useState(label?.name ?? '')
  const [domain, setDomain] = useState(label?.domain ?? '')
  const [hasApp, setHasApp] = useState(label?.app ?? false)

  return (
    <div className="side-modal-backdrop" onMouseDown={onClose}>
      <aside className="side-modal" onMouseDown={(event) => event.stopPropagation()}>
        <header>
          <h2>{isEditing ? 'Edit label' : 'Create a label'}</h2>
          <button className="icon-button" onClick={onClose} aria-label="Close label"><X size={18} /></button>
        </header>

        <div className="modal-form">
          <section className="modal-section">
            <h3>Label</h3>
            <label className="form-field">
              <span>Label name</span>
              <input
                className="standalone-input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="How the label is shown in the list"
              />
            </label>
            <label className="form-field">
              <span>Domain name</span>
              <input
                className="standalone-input"
                value={domain}
                onChange={(event) => setDomain(event.target.value)}
                placeholder="app.example.com"
              />
            </label>
          </section>

          <section className="modal-section">
            <h3>CSP</h3>
            <FormField label="Attached CSP" placeholder="Select a CSP" />
            {isEditing && label.csp.length > 0 && (
              <div className="csp-cell modal-csp">
                {label.csp.map((item) => <span className="role-pill" key={item}>{item}</span>)}
                {label.more > 0 && <span className="csp-more">+{label.more}</span>}
              </div>
            )}
          </section>

          <section className="modal-section">
            <h3>App</h3>
            <label className="toggle-row">
              <input type="checkbox" checked={hasApp} onChange={(event) => setHasApp(event.target.checked)} />
              <span className="toggle" />
              Presence of app
            </label>
          </section>
        </div>

        <footer>
          <button className="primary-button" onClick={onClose}>{isEditing ? 'Save changes' : 'Create'}</button>
          <button className="secondary-button" onClick={onClose}>Cancel</button>
        </footer>
      </aside>
    </div>
  )
}

function LabelsPage({ draft, setDraft }) {
  const [query, setQuery] = useState('')
  const filters = useFilters(labelFilterFields, 'voiceon.labels.filter-presets')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const matched = normalized
      ? labels.filter((item) => item.name.toLowerCase().includes(normalized))
      : labels
    return filters.apply(matched)
  }, [query, filters.applied])

  return (
    <div className="promotions-page">
      <HeaderTools>
        <label className="users-search">
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Label name" />
        </label>
        <FilterBar filters={filters} />
        <button className="archive-button toolbar-archive"><Archive size={16} /> Archive</button>
      </HeaderTools>

      <section className="panel promotions-panel">
        <div className="promotions-table-wrap">
          <table className="promotions-table labels-table">
            <thead>
              <tr>
                <th><span className="th-user">Label name <small>{filtered.length}</small></span></th>
                <th>CSP</th>
                <th>Domain name</th>
                <th>Presence of app</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} onClick={() => setDraft(item)}>
                  <td>
                    <div className="label-name-cell">
                      <strong>{item.name}</strong>
                      <span className="row-actions">
                        <button
                          className="row-action"
                          aria-label={`Edit ${item.name}`}
                          onClick={(event) => { event.stopPropagation(); setDraft(item) }}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="row-action"
                          aria-label={`Open ${item.domain}`}
                          onClick={(event) => event.stopPropagation()}
                        >
                          <ExternalLink size={14} />
                        </button>
                        <button
                          className="row-action"
                          aria-label={`Archive ${item.name}`}
                          onClick={(event) => event.stopPropagation()}
                        >
                          <Archive size={14} />
                        </button>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="csp-cell">
                      {item.csp.map((csp) => <span className="role-pill" key={csp}>{csp}</span>)}
                      {item.more > 0 && <span className="csp-more">+{item.more}</span>}
                    </div>
                  </td>
                  <td className="domain-cell">{item.domain}</td>
                  <td>
                    {item.app
                      ? <CircleCheck size={17} strokeWidth={1.5} className="app-check" />
                      : <span className="empty-cell">—</span>}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="users-empty">No labels match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {draft !== undefined && <LabelModal label={draft} onClose={() => setDraft(undefined)} />}
    </div>
  )
}

function App() {
  const [active, setActive] = useState('Users')
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerSlot, setHeaderSlot] = useState(null)
  const [notificationDraft, setNotificationDraft] = useState(undefined)
  const [promotionDraft, setPromotionDraft] = useState(undefined)
  const [labelDraft, setLabelDraft] = useState(undefined)

  const changeSection = (label) => {
    setActive(label)
    setNotificationDraft(undefined)
    setPromotionDraft(undefined)
    setLabelDraft(undefined)
  }

  const group = findNavGroup(active)
  const isTransactions = active.startsWith('Transactions')
  const createAction = {
    Notifications: { label: 'New notification', run: () => setNotificationDraft(null) },
    Promotions: { label: 'New promotion', run: () => setPromotionDraft(null) },
    Labels: { label: 'New label', run: () => setLabelDraft(null) },
  }[active]

  return (
    <div className="app-shell">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} active={active} setActive={changeSection} />
      <main className="main">
        <header className="topbar">
          <div className="workspace">
            <button className="icon-button menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={20} /></button>
            {group ? (
              <span className="header-breadcrumb">
                {group} <ChevronRight size={12} /> <strong>{active}</strong>
                {createAction && (
                  <button className="breadcrumb-add" onClick={createAction.run} aria-label={createAction.label}>
                    <Plus size={15} strokeWidth={2.2} />
                  </button>
                )}
              </span>
            ) : (
              <strong>{active}</strong>
            )}
          </div>
          <div className="header-tools" ref={setHeaderSlot} />
        </header>

        <HeaderSlotContext.Provider value={headerSlot}>
          <div className={`content ${isTransactions || ['Users', 'Notifications', 'Promotions', 'Labels'].includes(active) ? 'content-wide' : ''}`}>
            {active === 'Users' && <UsersPage />}
            {active === 'Notifications' && (
              <NotificationsPage draft={notificationDraft} setDraft={setNotificationDraft} />
            )}
            {active === 'Promotions' && (
              <PromotionsPage draft={promotionDraft} setDraft={setPromotionDraft} />
            )}
            {active === 'Labels' && (
              <LabelsPage draft={labelDraft} setDraft={setLabelDraft} />
            )}
            {isTransactions && <TransactionsPage region={active.replace('Transactions ', '')} />}
          </div>
        </HeaderSlotContext.Provider>
      </main>
    </div>
  )
}

export default App
