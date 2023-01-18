const faker = require('faker');

class ProductsService {

  constructor(){
    this.products=[];
    this.generate();
  };


  generate(){
    const limit= 100;

    for (let index = 0; index < limit; index++) {


     this.products.push({
        id:faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl()
      });

    };
  };

  async create(data){
    if(Object.keys(data).length === 0){
      throw new Error('Los datos del producto no pueden estar vacíos')
    }else{
       const newProduct = {
      id:faker.datatype.uuid(),
      ...data
    };
    this.products.push(newProduct);
    return newProduct;
    }





  };

  async find(){
     return this.products;
  };

  async findOne(id){
  const product =this.products.find(item => item.id === id);
  if(product=== undefined){
    throw new Error('Please check your id, product not found')
  }else{
    return product
  }
  };

  async update(id,newData){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Product not found, please check your id')
    }else{
      const product = this.products[index];
      this.products[index] ={
        ...product,
        ...newData
      };
      return this.products[index];
    };

  };

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Product not found, your id must be wrong')
    }else{
      this.products.splice(index,1);
      return {id}
    };
  };

};
module.exports = ProductsService;
