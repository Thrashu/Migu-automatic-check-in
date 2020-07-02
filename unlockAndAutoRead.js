/*解锁操作*/

var password='0000'
var startTime = new Date().getTime();
var excTime = 0;
var sleepTime = 0;
var i = 0;
var xPoint=650;
var yPoint=1250;

device.wakeUp();
device.setBrightness(0);
if(!device.isScreenOn()){
	device.wakeUpIfNeeded()
}
sleep(2000)
unlock()
sleep(300)
for(var i=0;i<password.length;i++){
	a=password.charAt(i)
	log(a)
	sleep(500)
	b=text(a).findOne().bounds()
	click(b.centerX(),b.centerY())
};
sleep(1000);
/*唤醒咪咕*/

//等待无障碍服务响应
auto.waitFor();
//打开咪咕
app.launch("com.ophone.reader.ui");
//点击搜索框
id("recom_btn_search").findOne().click();
sleep(3000);
//搜索关键词
setText("天天爱阅读");
id("btn_search_txt").findOne().click();
//点击banner
sleep(10000);
click(962,437);//注意：此处坐标为banner位置
sleep(6000);
className("android.view.View").text("去阅读").findOne().click();
sleep(10000);
click(170,1462);//书籍位置
/*阅读书籍*/
device.keepScreenDim();
sleep(3000);
readBook();

function  readBook()=>{
	while(true){
		i++;
		excTime = new Date().getTime()-startTime;
		//随机X轴 650-950
		xPoint = Math.floor(Math.random() * (950 - 650 + 1) ) + 650;
		//随机Y轴 1250-1600
		yPoint = Math.floor(Math.random() * (1600 - 1250 + 1) ) + 1250;
		sleepTime = 10000 + Math.random()*5000;

//第二段
		log("第" + i + "次点击，已经执行时间：" + Math.round(excTime/600)/100
			+ "分钟,点击("+xPoint +"," + yPoint +")");
		click(xPoint,yPoint);
		log("沉睡时间：" + Math.round(sleepTime/10)/100 + "秒");
		sleep(sleepTime);
		if(excTime >1020000){ //17分钟退出
			device.cancelKeepingAwake();
			back();
			sleep(6000);
			back();
			sleep(3000);
			back();
			sleep(6000);
			className("android.view.View").text("签到").clickable(true).findOne().click()
			back();
			sleep(2000);
			back();
			sleep(2000);
			back();
			sleep(1000);
			back();
			sleep(1000);
			back();
			sleep(1000);
			back();
			sleep(1000);
			back();
			sleep(1000);
			back();
			sleep(1000);
			toast("恭喜你完成打卡！");
			exit();
			Power();
		}
	}
}

function unlock()=>{
	var xyArr = [220]
	var x0=device.width/2
	var y0=device.height/4*3
	var angle = 0
	var x = 0
	var y = 0
	for (var i = 0; i < 30; i++) {
		y = x * tan(angle)
		log(y)
		if((y0-y)<0){
			break
		}
		var xy = [x0+x,y0-y]
		xyArr.push(xy)
		x += 5;
		angle += 3
	}
	gesture.apply(null,xyArr)
	 function tan(angle) {
		return Math.tan(angle * Math.PI / 180);
	}
}