const React    = require('react'),
	  ReactDOM = require('react-dom'),
	  $        = require('jquery'),
	  MainFun  = require('mainFun');  // 公共方法
      require('jquery-lazyload');
const mainFun = new MainFun();

let recommend  = 0,
    pageNumber = 0;

const MessageListCell = React.createClass({
        getInitialState : function(){
            return {
                promise : $.getJSON('http://www.ggxueche.com/main/article/page?recommend='+recommend+'&currentPage='+pageNumber+''),
                loadingShow : false,  //加载状态，默认是未加载
                error : null,
                Newsdata : null
            }
        },
        componentDidMount : function(){
            this.state.promise.then(
                value => this.setState({loadingShow: true, Newsdata: this.state.Newsdata == null ? value : Object.assign(this.state.Newsdata,value)}),
                error => this.setState({loadingShow: true, error: error})
            );
            window.addEventListener('scroll', this.handleScroll);
        },
        componentWillUnmount: function() {
            window.removeEventListener('scroll', this.handleScroll);
        },
        handleScroll: function(){
        　　var scrollTop = $(window).scrollTop();
        　　var scrollHeight = $(document).height();
        　　var windowHeight = $(window).height();
        　　if((scrollTop + windowHeight + 100) >= scrollHeight){
                //this.setState({loadingShow:false});
                //if(!this.state.loadingShow) { 
            　　　　this.setState({
                        loadingShow : true,
                        promise : $.getJSON('http://www.ggxueche.com/main/article/page?recommend='+recommend+'&currentPage='+(pageNumber+=1)+'')
                    });
            		this.state.promise.then(
    		            value => this.setState({Newsdata: this.state.Newsdata == null ? value : Object.assign(this.state.Newsdata,value)}),
    		            error => this.setState({error: error})
    		        );
                //}
        　　}
        },
        render: function(){
            if(!this.state.loadingShow){
                return (
                    <div className="loading-type swiper-slide" id="loading-type"><i className="loading-small"></i>正在努力加载</div>
                );
            }else if (this.state.error !== null) {
                return <span>Error: {this.state.error.message}</span>;
            }
            return (
                <ul className="mir-cell-news-list">
                    {this.state.Newsdata.articles.map((news) => {
                        return <MessageItemCell key={news.id} data={news} />
                    })}
                </ul>
            );
        }
});

const MessageItemCell = React.createClass({
        componentDidMount: function(){
            $(".swiper-lazy").lazyload({
                effect : "fadeIn"
            });
        },
        render: function(){
            var url = "${contextPath}/main/article/pages/detail/" + this.props.data.id;
            var img = this.props.data.picture ? this.props.data.picture.split(",")[0] : "./images/gg-default.jpg";
            return (
                <li className="mir-cell-bottom" id="mir-cell-share">
                    <a className="display-box" href={url}>
                        <div className="info box-flex">
                            <div className="title" id="title">{this.props.data.title}</div>
                            <div className="gary display-box">
                                <span><i className="icon-iconfontbukejian"></i><em id="click">{this.props.data.click}</em></span>
                                <span><i className="icon-pinglun"></i>{this.props.data.commentCount}</span>
                            </div>
                        </div>
                        <div className="img">
                            <img className="swiper-lazy" id="imgUrl" src={"./images/gg-default.jpg"} data-original={img} alt={this.props.data.keyword} />
                        </div>
                    </a>
                </li>
            );
        }
});

module.exports = MessageListCell;