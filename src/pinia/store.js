import { defineStore } from 'pinia'
import request from '../request/request.js'
const useCountStore=defineStore('Count',{
    state:()=>({
    count:0
    }),
    getters:{
        doubleCount:(state)=>{return state.count*2},
        lastCount(){return this.doubleCount-1}
    },
    actions:{
        changeCount(){
            this.$patch({
                count:this.count+1
            })
            
        },
        clearState(){
            this.$reset()//将state恢复默认
        }
    }
})

// 首页侧边导航栏仓库
const useNavigation=defineStore('navigation',{
  state:()=>({
    navList:[]
  }),
  getters:{

  },
  actions:{
    async getNavigation(){
      let result=await request({url:'/home/navigation',method:'GET'})
      this.$patch({
          navList:result.data
      })
    }
  }
})


// 首页轮播图仓库
const useCarousel=defineStore('carousel',{
    state:()=>({
     carouselList:[]
    }),
    getters:{

    },
    actions:{
      async getCarousel(){
        let result=await request({url:'/home/carousel',method:'GET'})
        this.$patch({
            carouselList:result.data
        })
      }
    }
})

// 首页类型仓库(/home)
const useTypeItem=defineStore('typeItem',{
    state:()=>({
     typeList:{}
    }),
    getters:{

    },
    actions:{
      async getTypeItem(){
        let result=await request({url:'/home/typeItem',method:'GET'})
        this.$patch({
            typeList:result.data
        })
      }
    }
})

// 首页侧边导航栏类型仓库(/home/type)
const useType=defineStore('type',{
  state:()=>({
    typeList:[]
  }),
  getters:()=>{

  },
  actions:{
    async getTypeAll(type){
      let result=await request({url:'/home/type',method:'POST',data:{type}})
      this.$patch({
        typeList:result.data
      })
    }
  }
})

// 类型首页跳转到类型库(/home/typeStore)
const useTypeStore=defineStore('typeStore',{
  state:()=>({
    typeList:[]
  }),
  getters:()=>{

  },
  actions:{
    async getTypeStore(type,page){
      let result=await request({url:'/home/typeStore',method:'POST',data:{type,page}})
      this.$patch({
        typeList:result.data
      })
    }
  }
})

// 类型首页切换排行榜类型（日-周-月）
const useRankType=defineStore('rankType',{
  state:()=>({
    rankList:{}
  }),
  getters:()=>{

  },
  actions:{
    async getRank(rankType){
    let result=await request({url:'/home/type/rank',method:'POST',data:{rankType}})
    this.$patch({
      rankList:result.data
    })
    }
  }
})

// 视频详情仓库
const useMovieDetail=defineStore('movieDetail',{
    state:()=>({
     movieDetail:{}
    }),
    getters:{

    },
    actions:{
      async getMovieDetail(onlyIndex){
        let result=await request({url:`/movieDetail/${onlyIndex}`,method:'POST'})
        this.$patch({
            movieDetail:result.data
        })
      }
    }
})

// 视频详情-相关推荐仓库
const useDetailRecommend=defineStore('detailRecommend',{
  state:()=>({
    recommendList:[]
  }),
  actions:{
    async getDetailRecommend(onlyIndex){
      let result=await request({url:`/movieDetail/recommend/${onlyIndex}`,method:'POST'})
      this.$patch({
        recommendList:result.data
      })
    }
  }
})

// 视频播放仓库
const useMoviePlay=defineStore('moviePlay',{
  state:()=>({
   movieUrl:{}
  }),
  getters:{

  },
  actions:{
    async getMoviePlay(onlyIndex,index){
      let result=await request({url:'/moviePlay',method:'POST',data:{onlyIndex,index}})
      this.$patch({
        movieUrl:result.data
      })
    }
  }
})


// 确保传递正确的 store 声明，支持热更新
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCountStore, import.meta.hot))
  }

export {useNavigation,useCarousel,useTypeItem,useType,useRankType,useTypeStore,useMovieDetail,useDetailRecommend,useMoviePlay}
