import { getBookShelf, saveBookShelf } from "./localStorage"
// 学科的国际化显示
export function categoryText(category, vue) {
    switch (category) {
        case 1:
            return vue.$t('category.novel')
        case 2:
            return vue.$t('category.literature')
        case 3:
            return vue.$t('category.philosophy')
        case 4:
            return vue.$t('category.art')
        case 5:
            return vue.$t('category.biography')
        case 6:
            return vue.$t('category.psychology')
        case 7:
            return vue.$t('category.prose')
        case 8:
            return vue.$t('category.caricature')
        case 9:
            return vue.$t('category.history')
        case 10:
            return vue.$t('category.science')
        case 11:
            return vue.$t('category.workplace')
        case 12:
            return vue.$t('category.youth')
        case 13:
            return vue.$t('category.drama')

    }
}

// 获取分类名称
export function getCategoryName(id) {
    switch (id) {
        case 1:
            return 'novel'
        case 2:
            return 'literature'
        case 3:
            return 'philosophy'
        case 4:
            return 'art'
        case 5:
            return 'biography'
        case 6:
            return 'psychology'
        case 7:
            return 'prose'
        case 8:
            return 'caricature'
        case 9:
            return 'history'
        case 10:
            return 'science'
        case 11:
            return 'workplace'
        case 12:
            return 'youth'
        case 13:
            return 'drama'
    }
}

export const categoryList = {
    'novel': 1,
    'literature': 2,
    'philosophy': 3,
    'art': 4,
    'biography': 5,
    'psychology': 6,
    'prose': 7,
    'caricature': 8,
    'history': 9,
    'science': 10,
    'workplace': 11,
    'youth': 12,
    'drama': 13
}

// 在最后面加上+
export function appendAddToShelf(list) {
    list.push({
        id: -1,
        type: 3
    })
    return list
}

// 移除最后面的+
export function removeAddFromShelf(list) {
    return list.filter(item => item.type !== 3)
}

export function computeId(list) {
    return list.map((book, index) => {
        if (book.type !== 3) {
            book.id = index + 1
            if (book.itemList) {
                book.itemList = computeId(book.itemList)
            }
        }
        return book
    })
}

// 跳转到详情页
export function gotoBookDetail(vue, book) {
    vue.$router.push({
        path: '/detail',
        query: {
            fileName: book.fileName,
            category: book.categoryText
        }
    })
}

// 添加到书架
export function addToShelf(book) {
    let shelfList = getBookShelf('shelf')
    shelfList = removeAddFromShelf(shelfList)
    book.type = 1
    shelfList.push(book)
    shelfList = computeId(shelfList)
    shelfList = appendAddToShelf(shelfList)
    saveBookShelf(shelfList)
}

// 移出书架
export function removeFromBookShelf(book) {
    return getBookShelf().filter(item => {
        if (item.itemList) {
            item.itemList = removeAddFromShelf(item.itemList)
        }
        return item.fileName !== book.fileName
    })
}