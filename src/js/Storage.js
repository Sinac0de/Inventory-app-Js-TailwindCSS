const products = [
    {
        id: 1,
        title: "React.js",
        category: "frontend",
        updated: '2022-09-04T04:04:35.112Z'
    },
    {
        id: 2,
        title: "Node.js",
        category: "backend",
        updated: '2022-10-04T04:04:35.112Z'
    },
    {
        id: 3,
        title: "Vue.js",
        category: "frontend",
        updated: '2022-11-04T04:04:35.112Z'
    },
];

const categories = [
    {
        id: 1,
        title: "frontend",
        description: "frontend of Application",
        createdAt: '2022-08-04T04:04:35.112Z'
    },
    {
        id: 2,
        title: "backend",
        description: "backend of Application",
        createdAt: '2022-10-04T04:04:35.112Z'
    },
];



class Storage {
    //add new category
    //getAllCategories

    static getAllCategories() {
        const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
        //sort categories in decending order
        const sortedCategories = savedCategories.sort((a, b) => {
            return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
        });

        return sortedCategories;
    }

    //save category
    static saveCategory(categoryToSave) {
        const savedCategories = Storage.getAllCategories();
        //find this category if existed:
        const existedCategory = savedCategories.find(c => c.id === categoryToSave.id);

        if (existedCategory) {
            //edit existed category
            existedCategory.title = categoryToSave.title;
            existedCategory.description = categoryToSave.description;
        } else {
            //create new category
            categoryToSave.id = new Date().getTime();
            categoryToSave.createdAt = new Date().toISOString();
            savedCategories.push(categoryToSave);
        }

        localStorage.setItem("categories", JSON.stringify(savedCategories));
    }

}