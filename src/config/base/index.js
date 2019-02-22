//  静态前缀
const prefix = '../../assets/img';
//  icon前缀
const iconprefix = '../../assets/img/icon';
//  logo前缀
const logoprefix = '../../assets/img/logo';

export const resource = {
  images:{

  },
  defaultImg:require('../../assets/img'+'/default.jpg'),
  errorPage:{
    Nofound404:require('../../assets/img/errorImg'+'/404.png')
  },
  bg:{
    admin_bg:require('../../assets/img/bg'+'/admin_bg.png')
  },
  icon:{
    admin_icon_password:require('../../assets/img/icon'+'/admin_icon_password.png'),
    admin_icon_user:require('../../assets/img/icon'+'/admin_icon_user.png')
  },
  logo:{
    zhlogolink:require('../../assets/img/logo'+'/zhlogolink.png'),
    zhwllogolink:require('../../assets/img/logo'+'/zhwllogolink.png'),
  }
};
