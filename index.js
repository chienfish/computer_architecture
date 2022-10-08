// add $t0, $t1, $t2
// sub $t0, $t1, $t2
// lw $t0, 32($s2)
// sw $t0, 32($s2)
var instruction = new Array("add", "sub", "lw", "sw");
var register = new Array("$t0", "$t1", "$t2", "$t3", "$t4", "$t5", "$t6", "$t7", "$t8", "$t9", 
                        "$s0", "$s1", "$s2", "$s3", "$s4", "$s5", "$s6", "$s7");

function checkReg(str, item) {  // 檢查是否是正確的暫存器
    item = item.replace(",", "");
    for (let i = 0; i < register.length; i++) {
        if (item == register[i]) {
            if (item == str[1].replace(",", ""))    $("#des").html(item);
            else    $("#source").append(item, " ");

            break;
        }else if (i == register.length-1) { //到最後一個還沒有跳出迴圈 -> 沒有在register array裡
            if (item == str[1].replace(",", ""))    $("#des").html("暫存器不存在");
            else {
                $("#source").html("暫存器不存在");
                return false;
            }
        }
    }

    return true;
}

function checkIns(ins) {    //檢查指令有沒有在instruction array裡
    for (let i = 0; i < instruction.length; i++) { 
        if (ins.length == 0) continue;
        else if (ins == instruction[i]) {
            $("#ins").html(ins);
            break;
        }
        else if (i == instruction.length-1) //到最後一個還沒有跳出迴圈 -> 沒有在instruction array裡
            $("#ins").html("指令不存在");
    }
}

$("#decode").click(function(){
    var MIPS = $("#MIPS").val();
    var str = MIPS.split(' ');
    var ins = str[0];
    checkIns(ins);  //檢查指令存在？

    // 先判斷是(add, sub)還是(lw,sw)
    if (ins == "add" || ins == "sub") {
        var item1 = str[1], item2 = str[2], item3 = str[3];
        $("#source").html("");
        checkReg(str, item1);   // 檢查destination regiser存在？
        if (checkReg(str, item2))   checkReg(str, item3);   // 檢查source regiser存在？
    }else if (ins == "lw" || ins == "sw") {
        var item1 = str[1], item2 = str[2];
    }

    console.log(str);
});

$("#clean").click(function(){
    $("#MIPS").val("");
    $("#ins").html("");
    $("#source").html("");
    $("#des").html("");
});