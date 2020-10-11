function Leader(name,grades){
	this.name = name;
	this.grade = grades;
	console.log("teacher:"+this.name+'\n'+"grades:"+this.grade);
}




function analyse(){
	var text = document.getElementById("text").value;
	// console.log(text);
	var root = text.split(/\n\n\n/);
	for(var i in root){
		var leader = root[i].split(/\n/);
		var teacher = leader[0].substring(3);
		var grades = [];
		var re1=/[0-9]+\u7ea7\u672c\u79d1\u751f/;
		var re2=/[0-9]+\u7ea7\u535a\u58eb\u751f/;
		var re3=/[0-9]+\u7ea7\u7855\u58eb\u751f/;
		for(var k in leader){
			if(re1.exec(leader[k])){
				grades.push(re1.exec(leader[k]));
			}
			if(re2.exec(leader[k])){
				grades.push(re2.exec(leader[k]));
			}
			if(re3.exec(leader[k])){
				grades.push(re3.exec(leader[k]));
			}
		}
		new Leader(teacher,grades);
	}
}


