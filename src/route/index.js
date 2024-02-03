// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []
  constructor(name, price, description) {
    this.name = name
    this.price = price
    this.description = description
    this.id = Math.floor(Math.random() * 100000)
    this.createDate = () => {
      this.date = new Date().toISOString()
    }
  }
  static getList = () => this.#list
  checkId = (id) => this.id === id
  static add = (product) => {
    this.#list.push(product)
  }
  static getById = (id) =>
    this.#list.find((product) => product.id === id)
  static updateById = (id, data) => {
    const product = this.getById(id)
  }
  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )
    // if (index !== -1) {
    //   this.#list.splice(index, 1)
    //   return true
    // } else {
    //   return false
    // }
  }
  static updateById = (id, data) => {
    const product = this.getById(id)
    const { name } = data
    if (product) {
      if (name) {
        product.name = name
      }
      return true
    } else {
      return false
    }
  }
}

// ================================================================

router.get('/product-create', function (req, res) {
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-create',
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================

router.post('/product-create', function (req, res) {
  // res.render генерує нам HTML сторінку
  const { name, price, description } = req.body
  const product = new Product(name, price, description)
  Product.add(product)
  console.log(Product.getList())
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-alert',
    message: 'Успішне виконання дії',
    info: 'Товар був успішно створений',
    button: 'Перейти у список доданих товарів',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.get('/product-alert', function (req, res) {
  res.render('product-list', {
    style: 'product-list',
  })
})

// ================================================================

router.get('/product-list', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = Product.getList()
  console.log(list)
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-list',
    data: {
      products: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.get('/product-edit', function (req, res) {
  // res.render генерує нам HTML сторінку
  const { id } = req.query
  const product = Product.getById(Number(id))
  // console.log(product)
  if (product) {
    // ↙️ cюди вводимо назву файлу з сontainer
    return res.render('product-edit', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'product-edit',
      data: {
        name: product.name,
        price: product.price,
        id: product.id,
        description: product.description,
      },
    })
  } else {
    return res.render('product-alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'product-alert',
      info: 'Продукту за таким ID не знайдено',
    })
  }
})
// ================================================================
router.post('/product-edit', function (req, res) {
  const { id, name, price, description } = req.body
  const product = Product.updateById(Number(id), {
    name,
    price,
    description,
  })
  console.log(id)
  console.log(product)
  if (product) {
    res.render('product-alert', {
      style: 'product-alert',
      info: 'Інформація про товар оновлена',
    })
  } else {
    res.render('product-alert', {
      style: 'product-alert',
      info: 'Сталася помилка',
    })
  }
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.get('/product-delete', function (req, res) {
  const { id } = req.query

  Product.deleteById(Number(id))

  res.render('product-alert', {
    style: 'product-alert',
    message: 'Товар був успішно видалений',
    info: 'Товар видалено',
  })
})

// router.post('/product-edit', function (req, res) {
//   const { id, name, price, description } = req.body

//   try {
//     // Здійснюємо оновлення товару
//     const updatedProduct = product.updateProductById(
//       Number(id),
//       { name, price, description },
//     )

//     // Якщо товар оновлено успішно
//     res.render('container/alert', {
//       info: 'Товар успішно оновлено',
//     })
//   } catch (error) {
//     // Якщо сталася помилка під час оновлення товару
//     res.render('container/alert', {
//       info: 'Не вдалося оновити товар. Спробуйте знову.',
//     })
//   }
// })

// Підключаємо роутер до бек-енду
module.exports = router
