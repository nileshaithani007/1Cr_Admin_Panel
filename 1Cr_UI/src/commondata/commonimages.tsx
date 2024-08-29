import msl_top_logo from '../assets/images/brand/CS_Logo.png'
import msl_bottom_logo from '../assets/images/brand/msl_bottom_logo.png'
import estee_lauder_logo_xl from '../assets/images/brand/estee_lauder_logo_xl.png'
import one_cr_logo from '../assets/images/brand/onecrLogo.png'

export const Imagesdata = (data: any) => {
  const img: any = {
    msl_top_logo,
    msl_bottom_logo,
    estee_lauder_logo_xl,
    one_cr_logo
  };
 
  return img[data];
};
 