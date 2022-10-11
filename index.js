// 測資
// add $t0, $t1, $t2
// sub $t0, $t1, $t2
// lw $t0, 32($s2)
// sw $t0, 48($s3)
var instruction = new Array("add", "sub", "lw", "sw");
var register = new Array("$t0", "$t1", "$t2", "$t3", "$t4", "$t5", "$t6", "$t7", "$t8", "$t9", 
                        "$s0", "$s1", "$s2", "$s3", "$s4", "$s5", "$s6", "$s7");
var destination, source=[];

function checkIns(ins) {    //檢查是否在instruction array裡
    for (let i = 0; i < instruction.length; i++) { 
        if (ins.length == 0) continue;
        else if (ins == instruction[i]) {
            $("#ins").html(ins);
            break;
        }else if (i == instruction.length-1) {//到最後一個還沒有跳出迴圈 -> 沒有在instruction array裡
            $("#ins").html(`${ins}指令不存在`);
            return false;
        }
    }
    return true;
}

function checkReg(item) {  // 檢查是否在register array裡
    for (let i = 0; i < register.length; i++) {
        if (item == register[i]) return true;
        else if (i == register.length-1) return false;
    }
}

function position(str, item) {
    if (checkReg(item)) {
        if (item == str[1])    destination = item;
        else    source.push(item);
    }else {
        if (item == str[1])    destination = `${item}暫存器不存在`;
        else    source.push(`${item}暫存器不存在`);
    }
}

function clean() {
    $("#ins").html("");
    $("#source").html("");
    $("#des").html("");
    destination = "";
    source.length = 0; // 清空陣列
}

$("#decode").click(function(){
    var MIPS = $("#MIPS").val();
    var str = MIPS.split(' ');
    var ins = str[0].toLowerCase();     // 大小寫都可以被判斷
    clean();

    for (let i = 0; i < str.length; i++)    //將逗號(,)都先清掉
        str[i] = str[i].replace(",", "");

    if (checkIns(ins)) {  //檢查指令存在？
        // 先判斷是運算類(add, sub)還是記憶體類(sw, lw) -> 記憶體類再分load(lw)和store(sw)
        if (ins == "add" || ins == "sub") {
            var item1 = str[1], item2 = str[2], item3 = str[3];
            $("#source").html("");
            position(str, item1);
            position(str, item2); 
            position(str, item3);
        }else if (ins == "lw" || ins == "sw") {
            var item1 = str[1], item2 = str[2].split("(")[0], item3 = str[2].match(/[^(][a-zA-Z0-9]+(?=\))/g)[0];
            if (ins == "lw") {
                position(str, item1);
                position(str, item3);
                source.push(item2);
            }else {
                // 檢查destination
                if (checkReg(item3)) {
                    destination = "Mem[" + item3 + "+" + item2 + "]";
                    source.push(item3);
                }else {
                    destination = `${item3}暫存器不存在`;
                    source.push(`${item3}暫存器不存在`);
                }
                // 檢查source
                if (checkReg(item1)) source.push(item1);
                else source.push(`${item1}暫存器不存在`);
            }
        }

        // 渲染
        $("#des").html(destination);
        for (let i = 0; i < source.length; i++) {
            $("#source").append(source[i]);
            if (i != source.length-1)   $("#source").append("、");
        }
    }
});

$("#clean").click(function(){
    $("#MIPS").val("");
    clean();
});