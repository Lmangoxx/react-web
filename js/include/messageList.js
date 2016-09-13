var React    = require('react'),
	ReactDOM = require('react-dom'),
	$        = require('jquery'),
	MainFun  = require('mainFun');  // 公共方法
var mainFun = new MainFun();

var MessageListCell = React.createClass({
    getInitialState : function(){
    	var recommend  = 0,
    		pageNumber = 0;
        return {
            promise : $.getJSON('http://www.ggxueche.com/main/article/page?recommend='+recommend+'&currentPage='+pageNumber+''),
            loadingShow : false,  //加载状态，默认是未加载
            error : null,
            Newsdata : null
        }
    },
    componentDidMount : function(){
        // this.state.promise.then(
        //     value => this.setState({loadingShow: true, Newsdata: value}),
        //     error => this.setState({loadingShow: true, error: error})
        // );
        // $(window).scroll(function(){
        // 　　var scrollTop = $(this).scrollTop();
        // 　　var scrollHeight = $(document).height();
        // 　　var windowHeight = $(this).height();
        // 　　if((scrollTop + windowHeight + 100) >= scrollHeight){
        //         if(!this.state.loadingShow) { 
        //     　　　　this.setState({
        //                 loadingShow : false,
        //                 promise : $.getJSON('http://www.ggxueche.com/main/article/page?recommend='+recommend+'&currentPage='+(pageNumber+=1)+'')
        //             });
        //         }
        // 　　}
        // }).bind(this);
    },
    componentWillUnmount: function() {
        this.setState({loadingShow:true});  //加载状态改为true，一次加载完成前防止频繁加载
    },
    render : function(){
        if(!this.state.loadingShow){
            return (
                <div className="loading-type swiper-slide" id="loading-type"><i className="loading-small"></i>正在努力加载</div>
            );
        }else if (this.state.error !== null) {
            return <span>Error: {this.state.error.message}</span>;
        }else{
            this.setState({loadingShow:true});
        }
        return (
            <div>
                {this.state.Newsdata.articles.map((news)=>{
                	return <MessageItemCell data={news} />
                })}
            </div>
        );
    }
});

var MessageItemCell = React.createClass({
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
	                    <img className="swiper-lazy" id="imgUrl" src={img} alt={this.props.data.keyword} />
	                </div>
	            </a>
	        </li>
		);
	}
});
module.exports = MessageListCell;