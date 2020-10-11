var ROOT = {};

function analyse(){
	var text = document.getElementById("text").value;
	var root = text.split(/\n\n\n/);

	for(var i in root){
		var leader = root[i].split(/\n/);
		var teacher = leader[0].substring(3);
		ROOT[teacher] = {};
		var grades = [];
		var re1=/[0-9]+\u7ea7\u672c\u79d1\u751f/;
		var re2=/[0-9]+\u7ea7\u535a\u58eb\u751f/;
		var re3=/[0-9]+\u7ea7\u7855\u58eb\u751f/;
		var re4 = /\u5bfc\u5e08/;
		for(var k in leader){
			if(re1.exec(leader[k])){
				grades.push(re1.exec(leader[k]));
				ROOT[teacher][re1.exec(leader[k])] = {};
				for(var q in leader[k].substring(9).split(/\、/)){
					ROOT[teacher][re1.exec(leader[k])][leader[k].substring(9).split(/\、/)[q]] = "";
				}
			}
			if(re2.exec(leader[k])){
				grades.push(re2.exec(leader[k]));
				ROOT[teacher][re2.exec(leader[k])] = {};
				for(var q in leader[k].substring(9).split(/\、/)){
					ROOT[teacher][re2.exec(leader[k])][leader[k].substring(9).split(/\、/)[q]] = "";
				}
			}
			if(re3.exec(leader[k])){
				grades.push(re3.exec(leader[k]));
				ROOT[teacher][re3.exec(leader[k])] = {};
				for(var q in leader[k].substring(9).split(/\、/)){
					ROOT[teacher][re3.exec(leader[k])][leader[k].substring(9).split(/\、/)[q]] = "";
				}
			}
			if(!re1.exec(leader[k]) && !re2.exec(leader[k]) && !re3.exec(leader[k]) && !re4.exec(leader[k]) && leader[k]!=''){
				// console.log(leader[k].split(/\：/));
				for(var w in ROOT[teacher]){
					// console.log(ROOT[teacher][w]);
					for(var e in ROOT[teacher][w]){
						if(e == leader[k].split(/\：/)[0]){
							ROOT[teacher][w][e] = leader[k].split(/\：/)[1];
						}
					}
				}
			}
		}
	}
	// return ROOT;
	console.log(ROOT);
	createTree();
}


function createTree(){
	document.write("<body></body>");
	var svg = d3.select('body').append('svg').attr('width',window.innerWidth).attr('height',window.innerHeight);
		
	var g = svg.append('g');
	var i = 1;
	for(var q in ROOT){
		var num1 = Object.keys(ROOT).length;
		var x1 = i*window.innerWidth/(num1+1);
		var y1 = window.innerHeight/2;

		var j = 0;
		for(var w in ROOT[q]){
			var num2 = Object.keys(ROOT[q]).length;
			var angle = 360/(num2);
			var x2 = x1 + 180*Math.cos((angle*j+30)*Math.PI/180);
			var y2 = y1 + 180*Math.sin((angle*j+30)*Math.PI/180);
			createline(x1,y1,x2,y2,'blue','3px');

			var k = 0;
			for(var e in ROOT[q][w]){
				var num3 = Object.keys(ROOT[q][w]).length;
				// console.log(num3);
				var angle2 = 360/(num3);
				var x3 = x2 + 80*Math.cos((angle2*k+60)*Math.PI/180);
				var y3 = y2 + 80*Math.sin((angle2*k+60)*Math.PI/180);
				// console.log(80*Math.cos(angle2*k*Math.PI/180)+"  "+80*Math.sin(angle2*k*Math.PI/180)+"  "+k);
				createline(x2,y2,x3,y3,'red','1px');
				createcircle(x3,y3,20,e,'red','8px');
				k++;
			}
			createcircle(x2,y2,30,w,'black','10px');
			j++;
		}
		createcircle(x1,y1,50,q,'blue','40px');
		i++;
	}
	

	function createcircle(x,y,r,text,color,size){
		var circle = g.append('circle').attr('cx',x).attr('cy',y).attr('r',r).attr('fill',color);
		
		var text = g.append('text')
					.text(text)
					.attr('fill','white')
					.attr('x', x)
					.attr('y', y)
					.attr('text-anchor', 'middle')
					.style('font-size', size)
					.attr('dy', 8);
	}

	function createrect(x,y,width,height,text,color,size){
		var rect = g.append('rect')
					.attr('x',x)
					.attr('y',y)
					.attr('width',width)
					.attr('height',height)
					.attr('fill',color);
		
		var text = g.append('text')
					.text(text)
					.attr('fill','white')
					.attr('x', x+width/2)
					.attr('y', y+height/2)
					.attr('text-anchor', 'middle')
					.style('font-size', size)
					.attr('dy', 8);
	}

	function createline(x1,y1,x2,y2,color,size){
		var line = g.append("line")
		            .attr("x1", x1)
		            .attr("x2", x2)
		            .attr("y1", y1)
		            .attr("y2", y2)
		            .attr("stroke", color)
		            .attr("stroke-width", size);
	}
}




