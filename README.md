# al-cart
***
购物车列表组件，展示了购物车中的商品列表，商品数量修改，商品删除，选择下单。

### 使用方法
---
安装npm包
```
npm install al-cart --save
```
导入page中的js页面
```js
import Cart from 'al-cart';

children={
    cart: new Cart({
        ...
    })
```
导入page中的xml页面
```xml
<component key="cart" name="al-cart" />
```
导入page中的less页面
```css
@import 'al-cart';
```
### 接口说明
---
|props    |type |default| Description|
|---------|:----|:------|:-----------|
|list|Array|[]|商品列表数据，符合alaska-cart service数据结构,详细字段见[[alaska-cart]](https://github.com/maichong/alaska-cart/blob/master/src/models/CartItem.js),字段中`id`为`购物车商品id`，`goods`为`商品id`，使用方式不一样，请注意。|
|onItemTap|Function| |item点击事件，点击商品时触发。返回`商品id`|
|onItemDelete|Function||item删除事件，点击删除按钮,在出现的modal提示框中点击 `是` 按钮后触发。|
|onOrderCreateTap|Function||下单事件，点击下单按钮时触发，返回一个以`id_sku_quantity|id_sku_quantity`的格式组合成的字符串。|
|onItemQuantitySet|Function||商品数量修改事件，点击每个商品的加减按钮或者直接输入数量时触发，返回`购物车商品id`和待修改的`数量`。|
---
#### 关于页面和组件间相互传值以及该组件所依赖的基础框架详见[labrador](https://github.com/maichong/labrador);
