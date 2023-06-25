# 组件复用
三个页面中/home首页与导航栏中跳转的/home/type都需要使用到MovieItem组件，因此MovieItem内部渲染时需要的数据，不能在MovieItem中调用仓库
获取，这样就写死了，以后复用MovieItem时里面的数据都是固定的。动态复用MovieItem，里面用到的数据应该由父组件(通过props)传入，Main组件和其他
使用了MovieItem组件的父组件应该在它们中获取数据，在传给MovieItem，实现动态渲染。（考虑便捷，这里传入的props统一设定为typeList(数组)）