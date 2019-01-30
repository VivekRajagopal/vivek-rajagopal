const Pages = [
    "/page-data/home.md",
    "/page-data/about.md",
    "/page-data/blog.md",
    "/page-data/blog-blog-zero.md",
    "/page-data/blog-markdown-blogup.md",
    "/page-data/blog-test.md",
    "/page-data/demo.md"
]

/*
const doesPageExist = pageName => {
    return (PageData.filter(page => page.name === pageName).length > 0)
}

const getPageData = pageName => {
    const result = PageData.filter(page => page.name === pageName);
    if (result.length) return result[0] 
    else return null;
}
*/

const doesPageExist = pageName => {
    return (Pages.indexOf(pageName) >= 0);
}

export default Pages;
export {doesPageExist}