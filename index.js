/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-10-19
 * @author li <li@maichong.it>
 */

import wx from 'labrador';
import CartItem from 'al-cart-item';

const { func } = wx.PropTypes;

export default class Cart extends wx.Component {
  propTypes = {
    onSelectList: func,
    onItemDelete: func,
    onItemQuantitySet: func,
    onItemTap: func
  };

  data = {
    selectCount: 0,
    allSelectStatus: true,
    selectPrice: 0
  };

  children = {
    listItems: new wx.List(CartItem, 'list', {
      checked: '>checked',
      quantity: '>quantity',
      onItemSelect: '#handleItemSelect',
      onItemDelete: '#handleItemDelete',
      onItemQuantitySet: '#handleItemQuantitySet',
      onItemTap: '#handleItemTap'
    })
  };

  handleItemSelect(id, select) {
    let list = [];
    let selectPrice = 0;
    this.data.list.forEach((item) => {
      if (item.checked && item.id !== id) {
        list.push(item.id);
        selectPrice += item.price;
      } else if (item.id === id) {
        item.checked = select;
        if (item.checked) {
          list.push(item.id);
          selectPrice += item.price;
        }
      }
    });
    let allSelectStatus = list.length === this.data.list.length;
    this.setData({ selectCount: list.length, allSelectStatus, selectPrice });
    this.props.onSelectList(list);
  }

  handleItemDelete(id) {
    console.log('al-cart----delete-',id);
    this.props.onItemDelete(id);
  }

  handleItemQuantitySet(id, quantity) {
    console.log('handleItemQuantitySet',arguments);
    this.props.onItemQuantitySet(id, quantity);
  }

  handleItemTap(id) {
    console.log('al-cart tap ------',id);
    this.props.onItemTap(id);
  }

  onLoad() {

  }

  onReady() {

  }

  onShow() {

  }

  onHide() {

  }

  onUnload() {

  }

  onUpdate(props) {
    let list = [];
    if (props.list && props.list.length > 0) {
      props.list.forEach((item) => {
        let flag = 0;
        this.data.list.forEach((_item) => {
          if (item.id === _item.id) {
            flag = 1;
            list.push({ ..._item });
          }
        });
        if (flag === 0) {
          list.push({ ...item, checked: true });
        }
      });
    }
    let selectCount = 0;
    let selectPrice = 0;
    let selectList = [];
    list.forEach((item) => {
      if (item.checked) {
        selectList.push(item.id);
        selectCount += 1;
        selectPrice += item.price;
      }
    });
    props.onSelectList(selectList);
    let allSelectStatus = list.length === selectCount;
    this.setData({ ...props, list, selectCount, allSelectStatus, selectPrice });
  }
}
