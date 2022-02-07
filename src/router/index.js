import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>
    import ('views/home/Home')
const Category = () =>
    import ('views/category/Category')
const Shelf = () =>
    import ('views/shelf/Shelf')
const List = () =>
    import ('views/list/StoreList')
const ShelfCategory = () =>
    import ('views/shelfcategory/ShelfCategory')
const Detail = () =>
    import ('views/detail/Detail')
const Ebook = () =>
    import ('views/ebook/Ebook')
const EbookReader = () =>
    import ('views/ebook/childComps/EbookReader')
const Login = () =>
    import ('views/login/Login')

Vue.use(VueRouter)

const routes = [{
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/shelf',
        component: Shelf
    },
    {
        path: '/list',
        component: List
    },
    {
        path: '/shelfcategory',
        component: ShelfCategory
    },
    {
        path: '/detail',
        component: Detail
    },
    {
        path: '/ebook',
        component: Ebook,
        children: [{
            path: ':fileName',
            component: EbookReader
        }]
    },
    {
        path: '/login',
        component: Login
    },


]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router