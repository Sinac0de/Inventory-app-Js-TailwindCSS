const products = [
    {
        id: 1,
        title: "React.js",
        category: "frontend",
        createdAt: '2022-09-04T04:04:35.112Z'
    },
    {
        id: 2,
        title: "Node.js",
        category: "backend",
        createdAt: '2022-10-04T04:04:35.112Z'
    },
    {
        id: 3,
        title: "Vue.js",
        category: "frontend",
        createdAt: '2022-11-04T04:04:35.112Z'
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

    //get All Categories in localStorage
    static getAllCategories() {
        const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
        //sort categories in decending order
        const sortedCategories = savedCategories.sort((a, b) => {
            return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
        });

        return sortedCategories;
    }

    //Edit or Add new Category
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

    //get All Products in localStorage
    static getAllProducts() {
        const savedProducts = JSON.parse(localStorage.getItem("categories")) || [];
        //sort products in decending order
        return savedCategories.sort((a, b) => {
            return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
        });
    }

    //Edit or Add new Product
    static saveProduct(productToSave) {
        const savedProducts = Storage.getAllProducts();
        //find this product if existed:
        const existedProduct = savedProducts.find(p => p.id === productToSave.id);

        if (existedProduct) {
            //edit existed Product
            existedProduct.title = productToSave.title;
            existedProduct.quantity = productToSave.quantity;
            existedProduct.category = productToSave.category;
        } else {
            //create new category
            productToSave.id = new Date().getTime();
            productToSave.createdAt = new Date().toISOString();
            savedProducts.push(productToSave);
        }

        localStorage.setItem("products", JSON.stringify(savedProducts));
    }

}