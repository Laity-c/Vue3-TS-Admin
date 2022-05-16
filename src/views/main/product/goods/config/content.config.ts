export const contentTableConfig = {
  title: '商品列表',
  newBtnTitle: '新建商品',
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '80' },
    { prop: 'oldPrice', label: '原价格', minWidth: '70', slotName: 'oldPrice' },
    { prop: 'newPrice', label: '现价格', minWidth: '70', slotName: 'newPrice' },
    { prop: 'desc', label: '商品描述', minWidth: '80' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '80', slotName: 'image' },
    { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
    { prop: 'inventoryCount', label: '库存', minWidth: '60' },
    { prop: 'saleCount', label: '销量', minWidth: '60' },
    { prop: 'favorCount', label: '收藏', minWidth: '60' },
    { prop: 'address', label: '地址', minWidth: '60' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '120',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '120',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColum: true,
  showSelectColum: true
}
