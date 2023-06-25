# vue3_test_hope

# 整体结构

一个核心页面Home，其中四个核心部分。头部组件Header，侧边导航栏Aside，路由组件router-view，底部组件Footer

路由组件- Main , MovieType , MovieDetail , MoviePlay

Main 首页展示，包含轮播图Swiper和视频展示栏 MovieItem，对应的路径 /home

MovieType 整体视频类别展示（侧边导航栏控制）包含视频展示栏 MovieItem 路径为/home/type 跳转时携带query参数表示类别 例：type=电影

MovieDetail 选择的视频详情 包含 标题区title,选集区域 Options 两个组件都需要传入props控制其样式（因为在MoviePlay页面复用且两次使用样式不相同）对应路径 /moviedetail 需携带query参数onlyIndex，表示选择的视频的唯一标识，便于后端返回对应的信息 例onlyIndex=01-001

MoviePlay 选集播放页面 包含 标题区title,选集区域 Options，第三方库video播放组件，视频展示栏 MovieItem 对应路径 /movieplay?onlyIndex=01-001&index=01 需携带query参数onlyIndex，index，后者表示选择视频的哪一集 便于后端返回数据