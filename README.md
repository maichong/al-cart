# al-cart
购物车列表组件。依赖al-cart-item组件，展示了购物车中的商品列表，商品数量修改，商品删除，选择下单。

### 使用方法
```
//安装npm包
npm install al-cart --save

//导入page中的js页面
import Cart from 'al-cart';

children={
    cart: new Cart({
        ...
    })

//导入page中的xml页面
<component key="cart" name="al-cart" />

//导入page中的less页面
@import 'al-cart';
```
### 接口说明
- list：Array
商品列表数据，符合alaska-cart service ，数据结构如下：
```
[
    {
        "id":"580f36b131023d0007aa1177",
        "pic":"http://img.maichong.it/shop/201609/57edf10c6715c216bfb834f.png",
        "title":"限时·国庆假期特惠零嘴套装",
        "goods":"57edf10c6715c0216bfb834d",
        "skuDesc":"",
        "currency":"balance",
        "price":65,
        "discount":0,
        "quantity":1,
        "createdAt":"2016-10-25T10:40:49.024Z"
    }
]
```
字段中"id"为购物车商品id，"goods"为商品id，使用方式不一样，请注意。
- onItemTap():id
item点击事件，点击商品时触发。返回商品id,该id是从al-cart-item中获取的goods属性。
- onItemDelete()：id
item删除事件，点击删除按钮时触发。
- onOrderCreateTap()：str
下单事件，点击下单按钮时触发，返回一个以"id_sku_quantity|id_sku_quantity"的格式组合成的字符串。
- onItemQuantitySet()：(id,quantity)
商品数量修改事件，点击每个商品的加减按钮或者直接输入数量时触发，返回商品的id和待修改的的数量结果。

#### 关于页面和组件间相互传值以及该组件所依赖的基础框架详见[labrador](https://github.com/maichong/labrador);
