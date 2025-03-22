import{u as $e,b as Ie,a as Fe,r as x,c as y,w as J,o as Oe,e as qe,f as u,g as r,h as e,q as K,t as l,l as b,k as n,n as f,I as p,v as g,x as F,y as ae,H as N,F as S,s as L,i as ie,j as Ne,m as Pe,J as P,K as le,A as Ue,L as ze}from"./index-IaK2R5-W.js";import{_ as Se}from"./Pagination-wja8j1Sf.js";const ne=[{value:"standard",label:"標準客房",icon:"fas fa-bed",description:"舒適實用的標準房型，適合商務旅客或短期停留。"},{value:"deluxe",label:"豪華客房",icon:"fas fa-star",description:"更寬敞的空間與高級設施，提供舒適奢華的住宿體驗。"},{value:"suite",label:"套房",icon:"fas fa-gem",description:"獨立的起居空間與臥室，享受尊貴私密的住宿環境。"},{value:"family",label:"家庭房",icon:"fas fa-users",description:"專為家庭設計的寬敞房型，配備適合兒童的設施。"},{value:"view",label:"景觀房",icon:"fas fa-mountain",description:"擁有絕佳視野的房型，欣賞美麗的自然或城市景觀。"}],U={ranges:{2:{value:"2",label:"最多2人",exact:2},4:{value:"4",label:"最多4人",exact:4},6:{value:"6",label:"5人以上",min:5}},parseRoomCapacity:m=>{const d=m.match(/\d+/);return d?parseInt(d[0]):0},isCapacityInRange:(m,d)=>{if(!d)return!0;const h=U.ranges[d];if(!h)return!0;const $=typeof m=="string"?U.parseRoomCapacity(m):m;return h.min?$>=h.min:$===h.exact},getCapacityLabel:m=>{var d;return((d=U.ranges[m])==null?void 0:d.label)||"所有人數"}},v={min:1e3,max:2e4,ranges:{low:{value:"low",label:"經濟型 (NT$ 5,000 以下)",min:1e3,max:5e3},medium:{value:"medium",label:"中價位 (NT$ 5,000 - 8,000)",min:5e3,max:8e3},high:{value:"high",label:"高級型 (NT$ 8,000 以上)",min:8e3,max:2e4}},isPriceInRange:(m,d)=>{if(!d)return!0;const h=v.ranges[d];return h?m>=h.min&&m<=h.max:!0}},ce=[{capacity:"最多2人",size:"35平方米",amenities:[{icon:"fas fa-wifi",text:"高速WiFi"},{icon:"fas fa-tv",text:"智能電視"},{icon:"fas fa-coffee",text:"迷你吧"}],featured:!1,tag:"",roomType:"standard"},{capacity:"最多2人",size:"45平方米",amenities:[{icon:"fas fa-wifi",text:"高速WiFi"},{icon:"fas fa-glass-martini-alt",text:"行政酒廊"},{icon:"fas fa-concierge-bell",text:"管家服務"}],featured:!0,tag:"熱門選擇",roomType:"deluxe"},{capacity:"最多4人",size:"60平方米",amenities:[{icon:"fas fa-wifi",text:"高速WiFi"},{icon:"fas fa-child",text:"兒童設施"},{icon:"fas fa-couch",text:"獨立起居室"}],featured:!1,tag:"",roomType:"family"},{capacity:"最多4人",size:"120平方米",amenities:[{icon:"fas fa-wifi",text:"高速WiFi"},{icon:"fas fa-swimming-pool",text:"私人泳池"},{icon:"fas fa-concierge-bell",text:"24小時管家"}],featured:!1,tag:"尊貴體驗",roomType:"suite"},{capacity:"最多2人",size:"50平方米",amenities:[{icon:"fas fa-wifi",text:"高速WiFi"},{icon:"fas fa-umbrella-beach",text:"海景陽台"},{icon:"fas fa-bath",text:"豪華浴缸"}],featured:!1,tag:"絕美景觀",roomType:"view"},{capacity:"2人",size:"55平方米",amenities:[{icon:"fas fa-wifi",text:"高速WiFi"},{icon:"fas fa-glass-cheers",text:"迎賓香檳"},{icon:"fas fa-hot-tub",text:"私人按摩浴缸"}],featured:!1,tag:"浪漫之選",roomType:"deluxe"}],oe=[{id:"wifi",name:"高速WiFi",icon:"fas fa-wifi"},{id:"pool",name:"私人泳池",icon:"fas fa-swimming-pool"},{id:"butler",name:"管家服務",icon:"fas fa-concierge-bell"},{id:"spa",name:"SPA服務",icon:"fas fa-spa"},{id:"gym",name:"健身中心",icon:"fas fa-dumbbell"},{id:"breakfast",name:"免費早餐",icon:"fas fa-coffee"},{id:"parking",name:"免費停車",icon:"fas fa-parking"},{id:"bar",name:"迷你吧",icon:"fas fa-glass-martini-alt"}],Le=(m,d)=>{if(!m||!d)return!1;const h=oe.find(k=>k.id===d);if(!h)return!1;const $=h.name.replace("高速","");return m.some(k=>k.text.includes($))},Me={class:"user-products"},We=e("div",{class:"products-banner"},[e("div",{class:"banner-overlay"}),e("div",{class:"banner-content"},[e("h2",null,"豪華客房與套房"),e("p",null,"為您的旅程提供無與倫比的奢華體驗")])],-1),Ae={class:"filter-section"},je={class:"container"},Be={class:"filter-header"},Ee=e("h3",null,[e("i",{class:"fas fa-filter"}),n(" 客房篩選")],-1),Ve={class:"filter-actions"},Ge={key:0,class:"filter-count"},He=e("i",{class:"fas fa-undo"},null,-1),Je={class:"filter-mode-switch"},Ke=e("i",{class:"fas fa-bolt"},null,-1),Qe=e("i",{class:"fas fa-sliders-h"},null,-1),Ye={key:0,class:"active-filters"},Xe={key:0,class:"filter-tag"},Ze=e("i",{class:"fas fa-calendar"},null,-1),et=e("i",{class:"fas fa-times"},null,-1),tt=[et],st={key:1,class:"filter-tag"},at=e("i",{class:"fas fa-users"},null,-1),it=e("i",{class:"fas fa-times"},null,-1),lt=[it],nt={key:2,class:"filter-tag"},ct=e("i",{class:"fas fa-tag"},null,-1),ot=e("i",{class:"fas fa-times"},null,-1),ut=[ot],rt={key:3,class:"filter-tag"},dt=e("i",{class:"fas fa-bed"},null,-1),vt=e("i",{class:"fas fa-times"},null,-1),ft=[vt],pt={key:4,class:"filter-tag"},_t=e("i",{class:"fas fa-concierge-bell"},null,-1),mt=e("i",{class:"fas fa-times"},null,-1),ht=[mt],gt={key:1,class:"quick-filter-area"},bt={class:"quick-filter-row"},kt={class:"quick-filter-item"},yt=e("label",null,[e("i",{class:"fas fa-calendar"}),n(" 入住日期")],-1),xt={class:"date-input-wrapper"},Dt=["min"],Ct={class:"quick-filter-item"},wt=e("label",null,[e("i",{class:"fas fa-calendar-minus"}),n(" 退房日期")],-1),Tt={class:"date-input-wrapper"},Rt=["min"],$t={class:"quick-filter-item"},It=e("label",null,[e("i",{class:"fas fa-users"}),n(" 客人數量")],-1),Ft=e("option",{value:""},"所有人數",-1),Ot=e("option",{value:"2"},"最多2人",-1),qt=e("option",{value:"4"},"最多4人",-1),Nt=e("option",{value:"6"},"5人以上",-1),Pt=[Ft,Ot,qt,Nt],Ut={class:"quick-filter-item"},zt=e("label",null,[e("i",{class:"fas fa-tag"}),n(" 價格範圍")],-1),St=e("option",{value:""},"全部價格",-1),Lt={value:"low"},Mt={value:"medium"},Wt={value:"high"},At={key:2},jt={class:"filter-tabs"},Bt=e("i",{class:"fas fa-calendar"},null,-1),Et=e("i",{class:"fas fa-users"},null,-1),Vt=e("i",{class:"fas fa-tag"},null,-1),Gt=e("i",{class:"fas fa-bed"},null,-1),Ht=e("i",{class:"fas fa-concierge-bell"},null,-1),Jt={class:"filter-content"},Kt={class:"tab-content"},Qt={class:"date-selection"},Yt={class:"date-range-inputs"},Xt={class:"filter-item"},Zt=e("label",{for:"checkInDate"},[e("i",{class:"fas fa-calendar-check"}),n(" 入住日期")],-1),es={class:"date-input-wrapper"},ts=["min"],ss={class:"filter-item"},as=e("label",{for:"checkOutDate"},[e("i",{class:"fas fa-calendar-minus"}),n(" 退房日期")],-1),is={class:"date-input-wrapper"},ls=["min"],ns={class:"quick-date-selection"},cs=e("h4",null,"快速選擇",-1),os={class:"quick-date-buttons"},us=e("i",{class:"fas fa-moon"},null,-1),rs=e("i",{class:"fas fa-calendar-week"},null,-1),ds=e("i",{class:"fas fa-calendar-alt"},null,-1),vs={class:"tab-content"},fs={class:"guest-selector"},ps={class:"guest-type"},_s=e("div",{class:"guest-info"},[e("span",{class:"guest-label"},"成人"),e("span",{class:"guest-desc"},"13歲以上")],-1),ms={class:"guest-controls"},hs=["disabled"],gs={class:"guest-count"},bs={class:"guest-type"},ks=e("div",{class:"guest-info"},[e("span",{class:"guest-label"},"兒童"),e("span",{class:"guest-desc"},"2-12歲")],-1),ys={class:"guest-controls"},xs=["disabled"],Ds={class:"guest-count"},Cs={class:"guest-type"},ws=e("div",{class:"guest-info"},[e("span",{class:"guest-label"},"嬰兒"),e("span",{class:"guest-desc"},"2歲以下")],-1),Ts={class:"guest-controls"},Rs=["disabled"],$s={class:"guest-count"},Is={class:"tab-content"},Fs={class:"price-range-filter"},Os={class:"price-range-header"},qs=e("h4",null,"價格範圍",-1),Ns={class:"price-range-value"},Ps={class:"price-range-slider"},Us=["min","max"],zs=["min","max"],Ss=e("div",{class:"price-slider-track"},null,-1),Ls={class:"price-range-labels"},Ms={class:"price-quick-filters"},Ws={class:"tab-content"},As={class:"room-type-filter"},js={class:"room-type-grid"},Bs=["onClick"],Es={class:"room-type-icon"},Vs={class:"room-type-info"},Gs={class:"tab-content"},Hs={class:"amenities-filter"},Js=e("h4",null,"熱門設施",-1),Ks={class:"amenities-grid"},Qs=["onClick"],Ys={class:"filter-footer"},Xs={key:0,class:"filter-results-preview"},Zs=e("i",{class:"fas fa-search"},null,-1),ea={class:"rooms-section"},ta={class:"container"},sa=e("div",{class:"section-header"},[e("h2",null,"精選客房"),e("p",null,"為您提供舒適豪華的住宿選擇")],-1),aa={key:0,class:"loading-container"},ia=e("div",{class:"loading-spinner"},null,-1),la=e("p",null,"正在載入客房資訊...",-1),na=[ia,la],ca={key:1,class:"no-results"},oa=e("i",{class:"fas fa-search"},null,-1),ua=e("h3",null,"沒有找到符合條件的客房",-1),ra=e("p",null,"請嘗試調整篩選條件或重置篩選",-1),da={key:2,class:"room-grid"},va={key:0,class:"room-tag"},fa=e("div",{class:"room-overlay"},null,-1),pa=[fa],_a={class:"room-info"},ma={class:"room-capacity"},ha={class:"room-amenities"},ga={class:"price"},ba=e("span",{class:"per-night"},"/ 晚",-1),ka={class:"room-actions"},ya=["onClick"],xa=["onClick"],Da=["onClick"],Ca={key:3,class:"pagination-container"},wa={class:"stay-experience-section"},Ta={class:"container"},Ra=Pe('<div class="section-header"><h2>尊享入住體驗</h2><p>為您的每一晚創造難忘回憶</p></div><div class="experience-grid"><div class="experience-item"><div class="experience-icon"><i class="fas fa-bed"></i></div><h3>頂級寢具</h3><p>精選埃及棉床單與羽絨枕，為您帶來極致舒適的睡眠體驗。</p></div><div class="experience-item"><div class="experience-icon"><i class="fas fa-coffee"></i></div><h3>客房餐飲</h3><p>24小時客房服務，隨時享用精緻美食與飲品。</p></div><div class="experience-item"><div class="experience-icon"><i class="fas fa-wifi"></i></div><h3>高速網絡</h3><p>全房高速WiFi覆蓋，輕鬆保持連接。</p></div><div class="experience-item"><div class="experience-icon"><i class="fas fa-concierge-bell"></i></div><h3>專屬管家</h3><p>尊貴套房專享的個人管家服務，滿足您的各種需求。</p></div></div>',2),$a={class:"experience-cta"},Oa={__name:"UserProducts",setup(m){const d=$e(),h=Ie(),$=Fe(),k=x(!0),M=y(()=>d.userProducts),Q=y(()=>d.pagination),_=x("dates"),D=x("quick"),W=y(()=>P(new Date)),t=x({checkInDate:"",checkOutDate:"",capacity:"",priceRange:"",roomType:"",features:{wifi:!1,pool:!1,butler:!1}}),C=v.min,w=v.max,c=x({min:C,max:w}),T=x(2),R=x(0),I=x(0);J(()=>t.value.checkInDate,s=>{if(s&&t.value.checkOutDate&&new Date(t.value.checkOutDate)<=new Date(s)){const a=new Date(s);a.setDate(a.getDate()+1),t.value.checkOutDate=P(a)}}),J(()=>c.value,s=>{s.min===C&&s.max===w?t.value.priceRange="":s.max<=v.ranges.low.max?t.value.priceRange="low":s.min>=v.ranges.high.min?t.value.priceRange="high":s.min>=v.ranges.medium.min&&s.max<=v.ranges.medium.max?t.value.priceRange="medium":t.value.priceRange="custom"},{deep:!0}),J(()=>t.value.priceRange,s=>{s==="low"?(c.value.min=v.ranges.low.min,c.value.max=v.ranges.low.max):s==="medium"?(c.value.min=v.ranges.medium.min,c.value.max=v.ranges.medium.max):s==="high"?(c.value.min=v.ranges.high.min,c.value.max=v.ranges.high.max):s===""&&(c.value.min=C,c.value.max=w)});const Y=y(()=>{if(!t.value.checkInDate)return W.value;const s=new Date(t.value.checkInDate);return s.setDate(s.getDate()+1),P(s)}),A=y(()=>t.value.checkInDate||t.value.checkOutDate||t.value.capacity||t.value.priceRange||t.value.roomType||j.value),j=y(()=>t.value.features.wifi||t.value.features.pool||t.value.features.butler),X=y(()=>{let s=0;return t.value.checkInDate&&t.value.checkOutDate&&s++,t.value.capacity&&s++,t.value.priceRange&&s++,t.value.roomType&&s++,j.value&&s++,s}),ue=U.getCapacityLabel,re=s=>{var a;return s==="custom"?`NT$ ${c.value.min} - NT$ ${c.value.max}`:s&&((a=v.ranges[s])==null?void 0:a.label)||"全部價格"},de=s=>{const a=ne.find(o=>o.value===s);return a?a.label:"所有房型"},Z=()=>{t.value={checkInDate:"",checkOutDate:"",capacity:"",priceRange:"",roomType:"",features:{wifi:!1,pool:!1,butler:!1}},c.value.min=C,c.value.max=w,T.value=2,R.value=0,I.value=0,V()},ve=()=>{t.value.checkInDate="",t.value.checkOutDate=""},fe=()=>{t.value.features.wifi=!1,t.value.features.pool=!1,t.value.features.butler=!1},B=s=>{const a=new Date;let o,i;switch(s){case"weekend":o=new Date(a),o.setDate(a.getDate()+(5-a.getDay()+7)%7),i=new Date(o),i.setDate(o.getDate()+2);break;case"nextWeek":o=new Date(a),o.setDate(a.getDate()+(8-a.getDay())%7),i=new Date(o),i.setDate(o.getDate()+4);break;case"nextMonth":o=new Date(a.getFullYear(),a.getMonth()+1,1),i=new Date(o),i.setDate(o.getDate()+6);break}t.value.checkInDate=P(o),t.value.checkOutDate=P(i)},ee=()=>{c.value.min>c.value.max&&(c.value.min=c.value.max)},E=s=>{t.value.priceRange=t.value.priceRange===s?"":s},pe=()=>{T.value++,O()},_e=()=>{T.value>1&&(T.value--,O())},me=()=>{R.value++,O()},he=()=>{R.value>0&&(R.value--,O())},ge=()=>{I.value++},be=()=>{I.value>0&&I.value--},O=()=>{const s=T.value+R.value;s<=2?t.value.capacity="2":s<=4?t.value.capacity="4":t.value.capacity="6"},ke=()=>{O(),_.value="dates"},ye=s=>t.value.features[s]===!0,xe=s=>{s in t.value.features&&(t.value.features[s]=!t.value.features[s])},te=()=>{console.log("應用篩選條件:",t.value),k.value=!0,setTimeout(()=>{k.value=!1},300)},se=y(()=>!M.value||Object.keys(M.value).length===0?[]:Object.values(M.value).map((s,a)=>{const o=a%ce.length,i=ce[o];return{id:s.id,title:s.title,description:s.description,image:s.imageUrl||"https://images.unsplash.com/photo-1631049307264-da0ec9d70304",price:s.price,capacity:i.capacity,size:i.size,amenities:i.amenities,featured:i.featured,tag:i.tag,roomType:i.roomType}})),z=y(()=>A.value?se.value.filter(s=>{if(t.value.roomType&&s.roomType!==t.value.roomType)return!1;if(t.value.priceRange){if(t.value.priceRange==="custom"){if(s.price<c.value.min||s.price>c.value.max)return!1}else if(!v.isPriceInRange(s.price,t.value.priceRange))return!1}if(t.value.capacity&&!U.isCapacityInRange(s.capacity,t.value.capacity))return!1;for(const[a,o]of Object.entries(t.value.features))if(o&&!Le(s.amenities,a))return!1;return!0}):se.value),De=()=>{const s=$.query;["checkInDate","checkOutDate","capacity","roomType","priceRange"].forEach(o=>{s[o]&&(t.value[o]=s[o].toString())}),(s.roomType||s.checkInDate&&s.checkOutDate)&&(D.value="advanced"),Object.keys(s).length>0&&setTimeout(()=>{te()},500)};Oe(async()=>{await V(),De()});const V=async(s=1)=>{k.value=!0;try{await d.getUserProducts(s)}catch(a){console.error("Failed to fetch user products:",a)}finally{k.value=!1}},Ce=async s=>{try{await d.addToCart(s,1),alert("成功加入購物車")}catch{alert("加入購物車失敗")}},we=s=>{h.push({name:"UserProductDetail",params:{id:s}})},Te=s=>{if(G(s.id))d.removeFromFavorites(s.id);else{const a={...s,imageUrl:s.image};d.addToFavorites(a)}},G=s=>d.isInFavorites(s);return(s,a)=>{const o=qe("router-link");return u(),r("div",Me,[We,e("div",Ae,[e("div",je,[e("div",{class:"filter-container",onClick:a[24]||(a[24]=K(()=>{},["stop"]))},[e("div",Be,[Ee,e("div",Ve,[X.value>0?(u(),r("span",Ge,l(X.value)+" 個篩選條件",1)):b("",!0),e("button",{class:"btn-reset",onClick:K(Z,["prevent"])},[He,n(" 重置篩選 ")])])]),e("div",Je,[e("button",{class:f(["filter-mode-btn",{active:D.value==="quick"}]),onClick:a[0]||(a[0]=i=>D.value="quick")},[Ke,n(" 快速篩選 ")],2),e("button",{class:f(["filter-mode-btn",{active:D.value==="advanced"}]),onClick:a[1]||(a[1]=i=>D.value="advanced")},[Qe,n(" 進階篩選 ")],2)]),A.value?(u(),r("div",Ye,[t.value.checkInDate&&t.value.checkOutDate?(u(),r("div",Xe,[Ze,n(" "+l(p(le)(t.value.checkInDate))+" - "+l(p(le)(t.value.checkOutDate))+" ",1),e("button",{onClick:ve,class:"btn-remove-tag"},tt)])):b("",!0),t.value.capacity?(u(),r("div",st,[at,n(" "+l(p(ue)(t.value.capacity))+" ",1),e("button",{onClick:a[2]||(a[2]=i=>t.value.capacity=""),class:"btn-remove-tag"},lt)])):b("",!0),t.value.priceRange?(u(),r("div",nt,[ct,n(" "+l(re(t.value.priceRange))+" ",1),e("button",{onClick:a[3]||(a[3]=i=>t.value.priceRange=""),class:"btn-remove-tag"},ut)])):b("",!0),t.value.roomType?(u(),r("div",rt,[dt,n(" "+l(de(t.value.roomType))+" ",1),e("button",{onClick:a[4]||(a[4]=i=>t.value.roomType=""),class:"btn-remove-tag"},ft)])):b("",!0),j.value?(u(),r("div",pt,[_t,n(" 特色服務 "),e("button",{onClick:fe,class:"btn-remove-tag"},ht)])):b("",!0)])):b("",!0),D.value==="quick"?(u(),r("div",gt,[e("div",bt,[e("div",kt,[yt,e("div",xt,[g(e("input",{type:"date","onUpdate:modelValue":a[5]||(a[5]=i=>t.value.checkInDate=i),min:W.value,class:"date-input"},null,8,Dt),[[F,t.value.checkInDate]])])]),e("div",Ct,[wt,e("div",Tt,[g(e("input",{type:"date","onUpdate:modelValue":a[6]||(a[6]=i=>t.value.checkOutDate=i),min:Y.value,class:"date-input"},null,8,Rt),[[F,t.value.checkOutDate]])])]),e("div",$t,[It,g(e("select",{"onUpdate:modelValue":a[7]||(a[7]=i=>t.value.capacity=i),class:"select-input"},Pt,512),[[ae,t.value.capacity]])]),e("div",Ut,[zt,g(e("select",{"onUpdate:modelValue":a[8]||(a[8]=i=>t.value.priceRange=i),class:"select-input"},[St,e("option",Lt,l(p(v).ranges.low.label),1),e("option",Mt,l(p(v).ranges.medium.label),1),e("option",Wt,l(p(v).ranges.high.label),1)],512),[[ae,t.value.priceRange]])])])])):b("",!0),D.value==="advanced"?(u(),r("div",At,[e("div",jt,[e("div",{class:f(["filter-tab",{active:_.value==="dates"}]),onClick:a[9]||(a[9]=i=>_.value="dates")},[Bt,n(" 日期 ")],2),e("div",{class:f(["filter-tab",{active:_.value==="guests"}]),onClick:a[10]||(a[10]=i=>_.value="guests")},[Et,n(" 客人 ")],2),e("div",{class:f(["filter-tab",{active:_.value==="price"}]),onClick:a[11]||(a[11]=i=>_.value="price")},[Vt,n(" 價格 ")],2),e("div",{class:f(["filter-tab",{active:_.value==="roomType"}]),onClick:a[12]||(a[12]=i=>_.value="roomType")},[Gt,n(" 房型 ")],2),e("div",{class:f(["filter-tab",{active:_.value==="features"}]),onClick:a[13]||(a[13]=i=>_.value="features")},[Ht,n(" 設施 ")],2)]),e("div",Jt,[g(e("div",Kt,[e("div",Qt,[e("div",Yt,[e("div",Xt,[Zt,e("div",es,[g(e("input",{id:"checkInDate",type:"date","onUpdate:modelValue":a[14]||(a[14]=i=>t.value.checkInDate=i),min:W.value,class:"date-input"},null,8,ts),[[F,t.value.checkInDate]])])]),e("div",ss,[as,e("div",is,[g(e("input",{id:"checkOutDate",type:"date","onUpdate:modelValue":a[15]||(a[15]=i=>t.value.checkOutDate=i),min:Y.value,class:"date-input"},null,8,ls),[[F,t.value.checkOutDate]])])])]),e("div",ns,[cs,e("div",os,[e("button",{onClick:a[16]||(a[16]=i=>B("weekend")),class:"quick-date-btn"},[us,n(" 本週末 ")]),e("button",{onClick:a[17]||(a[17]=i=>B("nextWeek")),class:"quick-date-btn"},[rs,n(" 下週 ")]),e("button",{onClick:a[18]||(a[18]=i=>B("nextMonth")),class:"quick-date-btn"},[ds,n(" 下個月 ")])])])])],512),[[N,_.value==="dates"]]),g(e("div",vs,[e("div",fs,[e("div",ps,[_s,e("div",ms,[e("button",{onClick:_e,disabled:T.value<=1,class:"btn-circle"}," - ",8,hs),e("span",gs,l(T.value),1),e("button",{onClick:pe,class:"btn-circle"},"+")])]),e("div",bs,[ks,e("div",ys,[e("button",{onClick:he,disabled:R.value<=0,class:"btn-circle"}," - ",8,xs),e("span",Ds,l(R.value),1),e("button",{onClick:me,class:"btn-circle"},"+")])]),e("div",Cs,[ws,e("div",Ts,[e("button",{onClick:be,disabled:I.value<=0,class:"btn-circle"}," - ",8,Rs),e("span",$s,l(I.value),1),e("button",{onClick:ge,class:"btn-circle"},"+")])]),e("div",{class:"guest-summary"},[e("button",{onClick:ke,class:"btn-apply"},"套用")])])],512),[[N,_.value==="guests"]]),g(e("div",Is,[e("div",Fs,[e("div",Os,[qs,e("span",Ns,"NT$ "+l(c.value.min)+" - NT$ "+l(c.value.max),1)]),e("div",Ps,[g(e("input",{type:"range","onUpdate:modelValue":a[19]||(a[19]=i=>c.value.min=i),min:p(C),max:p(w),step:500,onInput:ee,class:"price-slider min-slider"},null,40,Us),[[F,c.value.min,void 0,{number:!0}]]),g(e("input",{type:"range","onUpdate:modelValue":a[20]||(a[20]=i=>c.value.max=i),min:p(C),max:p(w),step:500,onInput:ee,class:"price-slider max-slider"},null,40,zs),[[F,c.value.max,void 0,{number:!0}]]),Ss]),e("div",Ls,[e("span",null,"NT$ "+l(p(C)),1),e("span",null,"NT$ "+l(p(w)),1)]),e("div",Ms,[e("button",{onClick:a[21]||(a[21]=i=>E("low")),class:f(["price-quick-btn",{active:t.value.priceRange==="low"}])},l(p(v).ranges.low.label),3),e("button",{onClick:a[22]||(a[22]=i=>E("medium")),class:f(["price-quick-btn",{active:t.value.priceRange==="medium"}])},l(p(v).ranges.medium.label),3),e("button",{onClick:a[23]||(a[23]=i=>E("high")),class:f(["price-quick-btn",{active:t.value.priceRange==="high"}])},l(p(v).ranges.high.label),3)])])],512),[[N,_.value==="price"]]),g(e("div",Ws,[e("div",As,[e("div",js,[(u(!0),r(S,null,L(p(ne),i=>(u(),r("div",{key:i.value,class:f(["room-type-card",{active:t.value.roomType===i.value}]),onClick:H=>t.value.roomType=t.value.roomType===i.value?"":i.value},[e("div",Es,[e("i",{class:f(i.icon)},null,2)]),e("div",Vs,[e("h4",null,l(i.label),1),e("p",null,l(i.description),1)])],10,Bs))),128))])])],512),[[N,_.value==="roomType"]]),g(e("div",Gs,[e("div",Hs,[Js,e("div",Ks,[(u(!0),r(S,null,L(p(oe),i=>(u(),r("div",{key:i.id,class:f(["amenity-item",{active:ye(i.id)}]),onClick:H=>xe(i.id)},[e("i",{class:f(i.icon)},null,2),e("span",null,l(i.name),1)],10,Qs))),128))])])],512),[[N,_.value==="features"]])])])):b("",!0),e("div",Ys,[z.value.length>0?(u(),r("div",Xs,[e("span",null,"找到 "+l(z.value.length)+" 間符合條件的客房",1)])):b("",!0),e("button",{class:"btn-search",onClick:K(te,["prevent"])},[Zs,n(" 搜尋 ")])])])])]),e("div",ea,[e("div",ta,[sa,k.value?(u(),r("div",aa,na)):z.value.length===0?(u(),r("div",ca,[oa,ua,ra,e("button",{class:"btn-reset-search",onClick:Z},"重置篩選")])):(u(),r("div",da,[(u(!0),r(S,null,L(z.value,(i,H)=>(u(),r("div",{key:H,class:f(["room-card",{featured:i.featured}])},[i.tag?(u(),r("div",va,l(i.tag),1)):b("",!0),e("div",{class:"room-image",style:Ue({backgroundImage:`url(${i.image})`})},pa,4),e("div",_a,[e("div",ma,[e("span",null,l(i.capacity),1),e("span",null,l(i.size),1)]),e("h3",null,l(i.title),1),e("p",null,l(i.description),1),e("div",ha,[(u(!0),r(S,null,L(i.amenities,(q,Re)=>(u(),r("span",{key:Re},[e("i",{class:f(q.icon)},null,2),n(" "+l(q.text),1)]))),128))]),e("div",ga,[n(" NT$ "+l(p(ze)(i.price))+" ",1),ba]),e("div",ka,[e("button",{class:"btn-details",onClick:q=>we(i.id)},"查看詳情",8,ya),e("button",{class:"btn-book",onClick:q=>Ce(i.id)},"立即預訂",8,xa),e("button",{class:f(["btn-favorite",{active:G(i.id)}]),onClick:q=>Te(i)},[e("i",{class:f(G(i.id)?"fas fa-heart":"far fa-heart")},null,2)],10,Da)])])],2))),128))])),Q.value.total_pages>1&&!A.value?(u(),r("div",Ca,[ie(Se,{pages:Q.value,onEmitPages:V},null,8,["pages"])])):b("",!0)])]),e("div",wa,[e("div",Ta,[Ra,e("div",$a,[ie(o,{to:"/facilities",class:"btn-view-more"},{default:Ne(()=>[n("探索更多設施服務")]),_:1})])])])])}}};export{Oa as default};
