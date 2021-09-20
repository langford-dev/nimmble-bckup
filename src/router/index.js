import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Photo from '../views/Photo.vue'
import Share from '../views/Share.vue'
import Login from '../views/Login.vue'
import Join from '../views/Join.vue'
import Explore from '../views/Explore.vue'
import Follow from '../views/Follow.vue'
import User from '../views/User.vue'
import Alerts from '../views/Alerts.vue'
import Chats from '../views/Chats.vue'
import MessagePage from '../views/MessagePage.vue'
import Edit from '../views/Edit.vue'
import ChangeProfile from '../views/ChangeProfile.vue'
import Tag from '../views/Tag.vue'
import Ad from '../views/Ad.vue'
import Report from '../views/Report.vue'
import Collection from '../views/Collection.vue'
import NewCollection from '../views/NewCollection.vue'
import ViewCollection from '../views/ViewCollection.vue'
import ShareQuote from '../views/ShareQuote.vue'
import ShareText from '../views/ShareText.vue'
import ShareVideo from '../views/ShareVideo.vue'
import Videos from '../views/Videos.vue'
import Friends from '../views/Friends.vue'
import Subscribers from '../views/Subscribers.vue'
import Status from '../views/Status.vue'
import Mentioned from '../views/Mentioned.vue'
import ReplyComment from '../views/ReplyComment.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Repost from '../views/Repost.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/photo/:id?/',
        name: 'Photo',
        component: Photo
    }, {
        path: '/share',
        name: 'Share',
        component: Share
    },{
        path: '/login',
        name: 'Login',
        component: Login
    },{
        path: '/join',
        name: 'Join',
        component: Join
    },{
        path: '/explore',
        name: 'Explore',
        component: Explore
    },{
        path: '/follow/:id?',
        name: 'Follow',
        component: Follow
    },{
        path: '/alerts',
        name: 'Alerts',
        component: Alerts
    },{
        path: '/chats',
        name: 'Chats',
        component: Chats
    },{
        path: '/c_c',
        name: 'MessagePage',
        component: MessagePage
    },{
        path: '/edit',
        name: 'Edit',
        component: Edit
    },{
        path: '/p',
        name: 'ChangeProfile',
        component: ChangeProfile
    },{
        path: '/tag/:tag?',
        name: 'Tag',
        component: Tag
    },{
        path: '/ad',
        name: 'Ad',
        component: Ad
    },{
        path: '/report/:id?',
        name: 'Report',
        component: Report
    },{
        path: '/collection/:id?',
        name: 'Collection',
        component: Collection
    },{
        path: '/new-collection/:id?',
        name: 'NewCollection',
        component: NewCollection
    },{
        path: '/view-collection/:id?',
        name: 'ViewCollection',
        component: ViewCollection
    },{
        path: '/share-quote',
        name: 'ShareQuote',
        component: ShareQuote
    },{
        path: '/share-text',
        name: 'ShareText',
        component: ShareText
    },{
        path: '/share-video',
        name: 'ShareVideo',
        component: ShareVideo
    },{
        path: '/videos',
        name: 'Videos',
        component: Videos
    },{
        path: '/friends',
        name: 'Friends',
        component: Friends
    },{
        path: '/followers/:id?',
        name: 'Followers',
        component: Subscribers
    },{
        path: '/status/:id?',
        name: 'Status',
        component: Status
    },{
        path: '/mentioned/:id?',
        name: 'Mentioned',
        component: Mentioned
    },{
        path: '/reply/:id?',
        name: 'ReplyComment',
        component: ReplyComment
    },{
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword
    },{
        path: '/repost/:id?',
        name: 'Repost',
        component: Repost
    },
    // ,{
    //     path: '/*',
    //     component: 404,
    // },
    {
        path: '/user/:id?',
        name: 'User',
        component: User
    },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
