export function arabicToChinese(props) {
    //console.log("num function: " + typeof (props));
    var temp = props;
    var str = "";
    if (temp > 10) {
      str += "十";
      temp -= 10;
    }
    switch (temp) {
      case 1:
        str += "一";
        break;
      case 2:
        str += "二";
        break;
      case 3:
        str += "三";
        break;
      case 4:
        str += "四";
        break;
      case 5:
        str += "五";
        break;
      case 6:
        str += "六";
        break;
      case 7:
        str += "七";
        break;
      case 8:
        str += "八";
        break;
      default:
        str += "九";
        break;
    }
    return str;
  }