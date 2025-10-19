import { UserProfile, OnlineStatus, Message } from './types';

export const MOCK_PROFILES: UserProfile[] = [
  {
    id: 1,
    name: 'Jessica, 28',
    age: 28,
    location: 'Miami, FL',
    imageUrl: 'https://picsum.photos/id/1027/400/500',
    status: OnlineStatus.Online,
    bio: 'Spontaneous adventurer seeking a partner in crime. Love hiking, trying new foods, and live music. I believe life is about collecting experiences, not things. Looking for someone genuine, kind, and ready for an adventure.',
    interests: ['Travel', 'Foodie', 'Concerts', 'Hiking', 'Photography', 'Wine Tasting'],
    galleryImages: [
        'https://picsum.photos/id/1027/800/600',
        'https://picsum.photos/id/1015/800/600',
        'https://picsum.photos/id/1025/800/600'
    ],
    lookingFor: ['Single Men', 'Couples'],
    relationshipStatus: 'Single',
  },
  {
    id: 2,
    name: 'Mark, 32',
    age: 32,
    location: 'Austin, TX',
    imageUrl: 'https://picsum.photos/id/1005/400/500',
    status: OnlineStatus.Away,
    bio: 'Software engineer by day, musician by night. Looking for someone to share good conversations and vinyl records with. My ideal night is a mix of intellectual chat and great music.',
    interests: ['Music', 'Tech', 'Coffee', 'Dogs', 'Vinyl Records'],
    galleryImages: [
      'https://picsum.photos/id/1005/800/600',
      'https://picsum.photos/id/1006/800/600',
      'https://picsum.photos/id/1009/800/600'
    ],
    lookingFor: ['Single Women'],
    relationshipStatus: 'Single',
  },
  {
    id: 3,
    name: 'Sophia & Leo, 29 & 31',
    age: 29,
    location: 'Denver, CO',
    imageUrl: 'https://picsum.photos/id/1012/400/500',
    status: OnlineStatus.Online,
    bio: 'We enjoy exploring the mountains and cozy nights in. Open-minded couple looking for new friends to share adventures with. We love board games, cooking together, and watching old movies.',
    interests: ['Skiing', 'Board Games', 'Cooking', 'Movies'],
    galleryImages: [
        'https://picsum.photos/id/1012/800/600',
        'https://picsum.photos/id/1013/800/600',
        'https://picsum.photos/id/1014/800/600'
    ],
    lookingFor: ['Single Men', 'Single Women', 'Couples'],
    relationshipStatus: 'In a relationship',
  },
  {
    id: 4,
    name: 'Chloe, 26',
    age: 26,
    location: 'Los Angeles, CA',
    imageUrl: 'https://picsum.photos/id/1011/400/500',
    status: OnlineStatus.Offline,
    bio: 'Artist and creative soul. My passions are painting, photography, and exploring art galleries. I draw inspiration from the city and nature. Looking for a deep, meaningful connection.',
    interests: ['Art', 'Photography', 'Museums', 'Yoga'],
    galleryImages: [
        'https://picsum.photos/id/1011/800/600',
        'https://picsum.photos/id/1020/800/600',
        'https://picsum.photos/id/1021/800/600'
    ],
    lookingFor: ['Single Men', 'Single Women'],
    relationshipStatus: 'Single',
  },
  {
    id: 5,
    name: 'David, 35',
    age: 35,
    location: 'Chicago, IL',
    imageUrl: 'https://picsum.photos/id/1013/400/500',
    status: OnlineStatus.Online,
    bio: 'Architect with a love for design and history. Enjoy cycling along the lakefront and discovering hidden gems in the city. Also a huge fan of live jazz and deep-dish pizza.',
    interests: ['Architecture', 'Cycling', 'History', 'Jazz'],
    galleryImages: [
        'https://picsum.photos/id/1013/800/600',
        'https://picsum.photos/id/1031/800/600',
        'https://picsum.photos/id/1032/800/600'
    ],
    lookingFor: ['Single Women'],
    relationshipStatus: 'Single',
  },
  {
    id: 6,
    name: 'Elena, 30',
    age: 30,
    location: 'New York, NY',
    imageUrl: 'https://picsum.photos/id/1022/400/500',
    status: OnlineStatus.Online,
    bio: 'Fashion designer who thrives on the city\'s energy. Let\'s grab a coffee and see where it goes. I\'m passionate about my work, but I also love to unwind with a good book or a Broadway show.',
    interests: ['Fashion', 'Brunch', 'Theater', 'Reading'],
    galleryImages: [
        'https://picsum.photos/id/1022/800/600',
        'https://picsum.photos/id/1035/800/600',
        'https://picsum.photos/id/1036/800/600'
    ],
    lookingFor: ['Single Men', 'Couples'],
    relationshipStatus: 'Single',
  },
  {
    id: 7,
    name: 'Alex & Mia, 33 & 30',
    age: 33,
    location: 'Seattle, WA',
    imageUrl: 'https://picsum.photos/id/103/400/500',
    status: OnlineStatus.Away,
    bio: 'Tech-savvy couple who love video games, sci-fi, and our two cats. Seeking fellow geeks for game nights or discussing the latest sci-fi blockbuster.',
    interests: ['Gaming', 'Sci-Fi', 'Cats', 'Coding'],
    galleryImages: [
        'https://picsum.photos/id/103/800/600',
        'https://picsum.photos/id/104/800/600',
        'https://picsum.photos/id/106/800/600'
    ],
    lookingFor: ['Couples'],
    relationshipStatus: 'Married',
  },
  {
    id: 8,
    name: 'Ben, 40',
    age: 40,
    location: 'San Francisco, CA',
    imageUrl: 'https://picsum.photos/id/1040/400/500',
    status: OnlineStatus.Offline,
    bio: 'Entrepreneur and fitness enthusiast. I believe in a healthy body and mind. Let\'s motivate each other to be our best selves, whether it\'s in the gym or launching a new project.',
    interests: ['Fitness', 'Startups', 'Meditation', 'Healthy Eating'],
    galleryImages: [
        'https://picsum.photos/id/1040/800/600',
        'https://picsum.photos/id/1043/800/600',
        'https://picsum.photos/id/1044/800/600'
    ],
    lookingFor: ['Single Women'],
    relationshipStatus: 'Divorced',
  },
  {
    id: 9,
    name: 'Olivia, 24',
    age: 24,
    location: 'Boston, MA',
    imageUrl: 'https://picsum.photos/id/1041/400/500',
    status: OnlineStatus.Online,
    bio: 'Grad student in literature. Can be found with my nose in a book or exploring historic cobblestone streets. I love coffee shops, rainy days, and intellectual conversations.',
    interests: ['Reading', 'History', 'Cafes', 'Running'],
    galleryImages: [
        'https://picsum.photos/id/1041/800/600',
        'https://picsum.photos/id/1045/800/600',
        'https://picsum.photos/id/1048/800/600'
    ],
    lookingFor: ['Single Men'],
    relationshipStatus: 'Single',
  },
   {
    id: 10,
    name: 'Liam, 29',
    age: 29,
    location: 'Portland, OR',
    imageUrl: 'https://picsum.photos/id/1062/400/500',
    status: OnlineStatus.Online,
    bio: 'Craft beer aficionado and outdoor lover. Always up for a hike followed by a visit to a new brewery. Sustainability is important to me.',
    interests: ['Craft Beer', 'Hiking', 'Camping', 'Sustainability'],
    galleryImages: [
        'https://picsum.photos/id/1062/800/600',
        'https://picsum.photos/id/1054/800/600',
        'https://picsum.photos/id/1053/800/600'
    ],
    lookingFor: ['Single Women'],
    relationshipStatus: 'Single',
  },
  {
    id: 11,
    name: 'Ava & Noah, 27 & 28',
    age: 27,
    location: 'San Diego, CA',
    imageUrl: 'https://picsum.photos/id/1074/400/500',
    status: OnlineStatus.Online,
    bio: 'Beach lovers and surfers. We live for sunny days and good vibes. Looking for like-minded people to hang out with, catch some waves, and enjoy a bonfire.',
    interests: ['Surfing', 'Beach', 'Tacos', 'Live Music'],
    galleryImages: [
        'https://picsum.photos/id/1074/800/600',
        'https://picsum.photos/id/1078/800/600',
        'https://picsum.photos/id/1080/800/600'
    ],
    lookingFor: ['Couples'],
    relationshipStatus: 'Engaged',
  },
  {
    id: 12,
    name: 'Isabella, 31',
    age: 31,
    location: 'New Orleans, LA',
    imageUrl: 'https://picsum.photos/id/1084/400/500',
    status: OnlineStatus.Away,
    bio: 'Chef with a passion for Creole cuisine. My life is all about food, music, and the vibrant culture of my city. There\'s always a festival to go to or a new dish to try.',
    interests: ['Cooking', 'Jazz', 'Festivals', 'Culture'],
    galleryImages: [
        'https://picsum.photos/id/1084/800/600',
        'https://picsum.photos/id/20/800/600',
        'https://picsum.photos/id/22/800/600'
    ],
    lookingFor: ['Single Men', 'Single Women'],
    relationshipStatus: 'Single',
  },
];

export const FRIENDS_IDS = [1, 6]; // Jessica and Elena are Olivia's friends

const now = new Date();

export const MOCK_MESSAGES: Record<number, Message[]> = {
    1: [ // Jessica
        { id: 1, text: 'Hey, I saw your profile and love your adventurous spirit!', sender: 'them', date: new Date(now.getTime() - 1000 * 60 * 65), read: true },
        { id: 2, text: 'Thanks! Your profile looks great too. That picture from the concert is awesome.', sender: 'me', date: new Date(now.getTime() - 1000 * 60 * 63), read: true },
        { id: 3, text: 'Haha, that was a fun night. We should definitely grab a drink sometime and trade travel stories.', sender: 'them', date: new Date(now.getTime() - 1000 * 60 * 62), read: true, saved: true },
        { id: 4, text: 'I\'d love that! Are you free this weekend?', sender: 'me', date: new Date(now.getTime() - 1000 * 60 * 60), read: true },
        { id: 5, text: 'I am! How about Saturday evening at The Cozy Spot?', sender: 'them', date: new Date(now.getTime() - 1000 * 60 * 5), read: false },
    ],
    2: [ // Mark
        { id: 1, text: 'Your taste in music is impeccable. Vinyls are the best!', sender: 'me', date: new Date(now.getTime() - 1000 * 60 * 60 * 25), read: true },
        { id: 2, text: 'Right? Nothing beats that warm sound. What have you been listening to lately?', sender: 'them', date: new Date(now.getTime() - 1000 * 60 * 60 * 24), read: true },
        { id: 3, text: 'Been spinning the new album from The War on Drugs. It\'s fantastic.', sender: 'me', date: new Date(now.getTime() - 1000 * 60 * 60 * 23), read: true },
    ],
    3: [ // Sophia & Leo
        { id: 1, text: 'Hi! We saw you\'re into board games. We\'re always looking for another player for our game nights.', sender: 'them', date: new Date(now.getTime() - 1000 * 60 * 60 * 48), read: true },
        { id: 2, text: 'Hey! That sounds like a lot of fun. What games do you usually play?', sender: 'me', date: new Date(now.getTime() - 1000 * 60 * 60 * 47), read: true },
    ],
     6: [ // Elena
        { id: 1, text: 'Hi Olivia! I love your style. That cafe photo is so chic.', sender: 'them', date: new Date(now.getTime() - 1000 * 60 * 60 * 72), read: true, saved: true },
        { id: 2, text: 'Thank you so much! You have a great eye for fashion yourself. Love your designs.', sender: 'me', date: new Date(now.getTime() - 1000 * 60 * 60 * 71), read: true },
        { id: 3, text: 'We should connect! Maybe grab a coffee and talk shop?', sender: 'them', date: new Date(now.getTime() - 1000 * 60 * 60 * 70), read: true },
    ],
};