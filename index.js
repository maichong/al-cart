/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-10-19
 * @author li <li@maichong.it>
 */

import wx from 'labrador';
import immutable from 'seamless-immutable';
import CartItem from './item';

const { array, func } = wx.PropTypes;

export default class Cart extends wx.Component {
  propTypes = {
    list: array,
    onItemTap: func,
    onItemDelete: func,
    onItemQuantitySet: func,
    onOrderCreateTap: func
  };

  data = {
    selectCount: 0,
    allSelectStatus: true,
    selectPrice: 0,
    selectStr: ''
  };

  children = {
    listItems: new wx.List(CartItem, 'list', {
      item: '>>',
      onSelect: '#handleItemSelect',
      onDelete: '#handleItemDelete',
      onQuantitySet: '#handleItemQuantitySet',
      onTap: '#handleItemTap'
    })
  };

  handleAllSelectTap() {
    let list = [];
    this.data.list.forEach((item) => {
      let temp = item.asMutable();
      temp.checked = !this.data.allSelectStatus;
      list.push(immutable(temp));
    });
    this.setData({ list });
    this.checkSelect();
  }

  handleItemSelect(component, select) {
    let id = this.data.list[component.key].id;
    let list = [];
    this.data.list.forEach((item) => {
      let temp = item.asMutable();
      if (temp.id === id) {
        temp.checked = select;
      }
      list.push(immutable(temp));
    });
    this.setData({ list });
    this.checkSelect();
  }

  handleItemDelete(component) {
    let id = this.data.list[component.key].id;
    this.props.onItemDelete(id);
  }

  handleItemQuantitySet(component, quantity) {
    let id = this.data.list[component.key].id;
    this.props.onItemQuantitySet(id, quantity);
  }

  handleItemTap(component) {
    let id = this.data.list[component.key].id;
    this.props.onItemTap(id);
  }

  onUpdate(props) {
    let list = [];
    props.list.forEach((item) => {
      let checked = true;
      this.data.list.forEach((temp) => {
        if (item.id === temp.id) {
          checked = temp.checked;
        }
      });
      item.checked = checked;
      list.push(immutable(item));
    });
    this.setData({ list });
    this.checkSelect();
  }

  handleCreateTap() {
    if (this.data.selectCount > 0) {
      this.props.onOrderCreateTap(this.data.selectStr);
    }
  }

  /**
   * 检查所有选中的 项 总数 总价
   */
  checkSelect() {
    let select = [];
    let selectCount = 0;
    let selectPrice = 0;
    this.data.list.forEach((item) => {
      if (item.checked) {
        select.push(`${item.goods}_${item.sku || ''}_${item.quantity}`);
        selectCount += 1;
        selectPrice += item.price * item.quantity;
      }
    });
    let allSelectStatus = this.data.list.length === selectCount;
    this.setData({ selectCount, selectPrice, allSelectStatus, selectStr: select.join('|') });
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
}
