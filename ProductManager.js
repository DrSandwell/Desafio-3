const fs = require('fs');

/* function createProductsFile() {
    const products = [];

    try {
        fs.writeFileSync('./products.json', JSON.stringify(products, null, 2));
        console.log("Archivo products.json creado correctamente.");
    } catch (error) {
        console.error("Error al crear el archivo products.json:", error.message);
    }
}

createProductsFile();
 */
class ProductManager {
    static ultId = 0;

    constructor() {
        this.path = "./products.json";
        this.products = this.loadProducts();
    }

    addProduct(newProduct) {
        if (!newProduct.titulo || !newProduct.descripcion || !newProduct.precio || !newProduct.img || !newProduct.code || !newProduct.stock) {
            console.log("Completar todos los campos");
            return;
        }
        if (this.products.some(item => item.code === newProduct.code)) {
            console.log("Error al intentar agregar el producto. El código debe ser único");
            return;
        }
        newProduct.id = ++ProductManager.ultId;
        this.products.push(newProduct);
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(item => item.id === id);
        if (!product) {
            console.log("Producto no encontrado");
            return null;
        } else {
            console.log("Producto encontrado:", product);
            return product;
        }
    }

    updateProduct(id, updatedFields) {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const products = JSON.parse(data);
            const index = products.findIndex(product => product.id === id);
            if (index === -1) {
                console.log("Producto no encontrado");
                return;
            }
            const updatedProduct = { ...products[index], ...updatedFields };
            products[index] = updatedProduct;
            fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
            this.products = products;

            console.log("Producto actualizado correctamente");
        } catch (error) {
            console.log("Error al actualizar el producto:", error.message);
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            console.log("Producto no encontrado");
            return;
        }
        this.products.splice(index, 1);
        this.saveProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.log("Error al cargar el archivo de productos:", error.message);
            return [];
        }
    }

    saveProducts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
            console.log("Productos guardados correctamente");
        } catch (error) {
            console.log("Error al guardar los productos:", error.message);
        }
    }
}


const manager = new ProductManager();
module.exports = ProductManager;
manager.getProductById(2);