import React from 'react'
import './Invoice.scss'
export default function Invoice() {

  const formatStringToCamelCase = str => {
    const splitted = str.split("-");
    if (splitted.length === 1) return splitted[0];
    return (
      splitted[0] +
      splitted
        .slice(1)
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join("")
    );
  };
  
   const getStyleObjectFromString = str => {
    const style = {};
    str.split(";").forEach(el => {
      const [property, value] = el.split(":");
      if (!property) return;
  
      const formattedProperty = formatStringToCamelCase(property.trim());
      style[formattedProperty] = value.trim();
    });
  
    return style;
  };


  return (
  <>
<div className='invoice'>


  <table width="100%" border="0" cellPadding="0" cellSpacing="0" align="center" className="fullTable" bgcolor="#fff">
    <tbody>
      {/* <tr>
        <td height="20"></td>
      </tr> */}
      <tr>
        <td>
          <table  border="0" cellPadding="0" cellSpacing="0" align="center" className="fullTable"
            bgcolor="#ffffff" style= {getStyleObjectFromString("border-radius: 10px 10px 0 0")}>
            <tbody>
              <tr className="hiddenMobile">
                <td height="40"></td>
              </tr>
            

              <tr>
                <td>
                  <table width="480" border="0" cellPadding="0" cellSpacing="0" align="center" className="fullPadding">
                    <tbody>
                      <tr>
                        <td>
                          <table width="220" border="0" cellPadding="0" cellSpacing="0" align="left" className="col">
                            <tbody>
                              <tr>
                                <td align="left"> <img src="http://www.supah.it/dribbble/017/logo.png" width="32"
                                    height="32" alt="logo" border="0"/></td>
                              </tr>
                              {/* <tr className="hiddenMobile">
                                <td height="40"></td>
                              </tr> */}
                              <tr className="visibleMobile">
                                <td height="20"></td>
                              </tr>
                              <tr>
                                <td
                                  style= {getStyleObjectFromString("font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left")}>
                                  Hello, Philip Brooks.
                                  <br/> Thank you for shopping from our store and for your order.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table width="220" border="0" cellPadding="0" cellSpacing="0" align="right" className="col">
                            <tbody>
                           
                              <tr>
                                <td height="5"></td>
                              </tr>
                              <tr>
                                <td
                                  style= {getStyleObjectFromString("font-size: 21px; color: #ff0000; letter-spacing: -1px; font-family: 'Open Sans', sans-serif; line-height: 1; vertical-align: top; text-align: right")}>
                                  Invoice
                                </td>
                              </tr>
                              <tr>
                              </tr>
                              {/* <tr className="hiddenMobile">
                                <td height="50"></td>
                              </tr> */}
                              <tr className="visibleMobile">
                                <td height="30"></td>
                              </tr>
                              <tr>
                                <td
                                  style= {getStyleObjectFromString("font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: right")}>
                                  <small>ORDER</small> #800000025<br/>
                                  <small>MARCH 4TH 2016</small>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>

  <table width="100%" border="0" cellPadding="0" cellSpacing="0" align="center" className="fullTable" bgcolor="#fff">
    <tbody>
      <tr>
        <td>
          <table  border="0" cellPadding="0" cellSpacing="0" align="center" className="fullTable"
            bgcolor="#ffffff">
            <tbody>
              <tr>
              </tr>
              {/* <tr className="hiddenMobile">
                <td height="60"></td>
              </tr> */}
              <tr className="visibleMobile">
                <td height="40"></td>
              </tr>
              <tr>
                <td>
                  <table width="480" border="0" cellPadding="0" cellSpacing="0" align="center" className="fullPadding">
                    <tbody>
                      <tr>
                        <th
                          style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 10px 7px 0")}
                          width="52%" align="left">
                          Item
                        </th>
                        <th
                          style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px")}
                          align="left">
                          <small>SKU</small>
                        </th>
                        <th
                          style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px")}
                          align="center">
                          Quantity
                        </th>
                        <th
                          style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px")}
                          align="right">
                          Subtotal
                        </th>
                      </tr>
                      <tr>
                        <td height="1" style= {getStyleObjectFromString("background: #bebebe")} colSpan="4"></td>
                      </tr>
                      <tr>
                        <td height="10" colSpan="4"></td>
                      </tr>
                      <tr>
                        <td
                          style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #ff0000;  line-height: 18px;  vertical-align: top; padding:10px 0")}
                          className="article">
                          Beats Studio Over-Ear Headphones
                        </td>
                        <td
                          style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e;  line-height: 18px;  vertical-align: top; padding:10px 0")}>
                          <small>MH792AM/A</small>
                        </td>
                        <td
                          style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e;  line-height: 18px;  vertical-align: top; padding:10px 0")}
                          align="center">1</td>
                        <td
                          style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33;  line-height: 18px;  vertical-align: top; padding:10px 0")}
                          align="right">$299.95</td>
                      </tr>
                      <tr>
                        <td height="1" colSpan="4" style= {getStyleObjectFromString("border-bottom:1px solid #e4e4e4")}></td>
                      </tr>
                      <tr>
                        <td
                          style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #ff0000;  line-height: 18px;  vertical-align: top; padding:10px 0")}
                          className="article">Beats RemoteTalk Cable</td>
                        <td
                          style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e;  line-height: 18px;  vertical-align: top; padding:10px 0")}>
                          <small>MHDV2G/A</small>
                        </td>
                        <td
                          style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e;  line-height: 18px;  vertical-align: top; padding:10px 0")}
                          align="center">1</td>
                        <td
                          style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33;  line-height: 18px;  vertical-align: top; padding:10px 0")}
                          align="right">$29.95</td>
                      </tr>
                      <tr>
                        <td height="1" colSpan="4" style= {getStyleObjectFromString("border-bottom:1px solid #e4e4e4")}></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td height="20"></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>

  <table width="100%" border="0" cellPadding="0" cellSpacing="0" align="center" className="fullTable" bgcolor="#fff">
    <tbody>
      <tr>
        <td>
          <table   border="0" cellPadding="0" cellSpacing="0" align="center" className="fullTable"
            bgcolor="#ffffff">
            <tbody>
              <tr>
                <td>

             
                  <table width="480" border="0" cellPadding="0" cellSpacing="0" align="center" className="fullPadding">
                    <tbody>
                      <tr>
                        <td
                          style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right")}>
                          Subtotal
                        </td>
                        <td
                          style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; white-space:nowrap")}
                          width="80">
                          $329.90
                        </td>
                      </tr>
                      <tr>
                        <td
                          style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right")}>
                          Shipping &amp; Handling
                        </td>
                        <td
                          style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right")}>
                          $15.00
                        </td>
                      </tr>
                      <tr>
                        <td
                          style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right")}>
                          <strong>Grand Total (Incl.Tax)</strong>
                        </td>
                        <td
                          style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right")}>
                          <strong>$344.90</strong>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #b0b0b0; line-height: 22px; vertical-align: top; text-align:right")}>
                          <small>TAX</small>
                        </td>
                        <td
                          style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #b0b0b0; line-height: 22px; vertical-align: top; text-align:right")}>
                          <small>$72.40</small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
            

                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>

  <table width="100%" border="0" cellPadding="0" cellSpacing="0" align="center" className="fullTable" bgcolor="#fff">
    <tbody>
      <tr>
        <td>
          <table  border="0" cellPadding="0" cellSpacing="0" align="center" className="fullTable"
            bgcolor="#ffffff">
            <tbody>
              <tr>
              </tr>
              {/* <tr className="hiddenMobile">
                <td height="60"></td>
              </tr> */}
              <tr className="visibleMobile">
                <td height="40"></td>
              </tr>
              <tr>
                <td>
                  <table width="480" border="0" cellPadding="0" cellSpacing="0" align="center" className="fullPadding">
                    <tbody>
                      <tr>
                        <td>
                          <table width="220" border="0" cellPadding="0" cellSpacing="0" align="left" className="col">

                            <tbody>
                            <tr className="visibleMobile"><td height="20"></td></tr>
                              <tr>
                                <td
                                  style= {getStyleObjectFromString("font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top")}>
                                  <strong>BILLING INFORMATION</strong>
                                </td>
                              </tr>
                              <tr>
                                <td width="100%" height="10"></td>
                              </tr>
                              <tr>
                                <td
                                  style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top")}>
                                  Philip Brooks<br/> Public Wales, Somewhere<br/> New York NY<br/> 4468, United States<br/>
                                  T: 202-555-0133
                                </td>
                              </tr>
                            </tbody>
                          </table>


                          <table width="220" border="0" cellPadding="0" cellSpacing="0" align="right" className="col">
                            <tbody>
                              <tr className="visibleMobile">
                                <td height="20"></td>
                              </tr>
                              <tr>
                                <td
                                  style= {getStyleObjectFromString("font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top")}>
                                  <strong>PAYMENT METHOD</strong>
                                </td>
                              </tr>
                              <tr>
                                <td width="100%" height="10"></td>
                              </tr>
                              <tr>
                                <td
                                  style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top")}>
                                  Credit Card<br/> Credit Card Type: Visa<br/> Worldpay Transaction ID: <a href="#"
                                    style= {getStyleObjectFromString("color: #ff0000; text-decoration:underline")}>4185939336</a><br/>
                                  <a href="#" style= {getStyleObjectFromString("color:#b0b0b0")}>Right of Withdrawal</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table width="480" border="0" cellPadding="0" cellSpacing="0" align="center" className="fullPadding">
                    <tbody>
                      <tr>
                        <td>
                          <table width="220" border="0" cellPadding="0" cellSpacing="0" align="left" className="col">
                            <tbody>
                              <tr className="hiddenMobile">
                                <td height="35"></td>
                              </tr>
                              <tr className="visibleMobile">
                                <td height="20"></td>
                              </tr>
                              <tr>
                                <td
                                  style= {getStyleObjectFromString("font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top")}>
                                  <strong>SHIPPING INFORMATION</strong>
                                </td>
                              </tr>
                              <tr>
                                <td width="100%" height="10"></td>
                              </tr>
                              <tr>
                                <td
                                  style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top")}>
                                  Sup Inc<br/> Another Place, Somewhere<br/> New York NY<br/> 4468, United States<br/> T:
                                  202-555-0171
                                </td>
                              </tr>
                            </tbody>
                          </table>


                          <table width="220" border="0" cellPadding="0" cellSpacing="0" align="right" className="col">
                            <tbody>
                              <tr className="hiddenMobile">
                                <td height="35"></td>
                              </tr>
                              <tr className="visibleMobile">
                                <td height="20"></td>
                              </tr>
                              <tr>
                                <td
                                  style= {getStyleObjectFromString("font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top")}>
                                  <strong>SHIPPING METHOD</strong>
                                </td>
                              </tr>
                              <tr>
                                <td width="100%" height="10"></td>
                              </tr>
                              <tr>
                                <td
                                  style= {getStyleObjectFromString("font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top")}>
                                  UPS: U.S. Shipping Services
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              {/* <tr className="hiddenMobile">
                <td height="60"></td>
              </tr> */}
              <tr className="visibleMobile">
                <td height="30"></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>

  <table width="100%" border="0" cellPadding="0" cellSpacing="0" align="center" className="fullTable" bgcolor="#fff">

    <tbody>
      <tr>
        <td>
          <table  border="0" cellPadding="0" cellSpacing="0" align="center" className="fullTable"
            bgcolor="#ffffff" style= {getStyleObjectFromString("border-radius: 0 0 10px 10px")}>
            <tbody>
              <tr>
                <td>
                  <table width="480" border="0" cellPadding="0" cellSpacing="0" align="center" className="fullPadding">
                    <tbody>
                      <tr>
                        <td
                          style= {getStyleObjectFromString("font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left")}>
                          Have a nice day.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              {/* <tr className="spacer">
                <td height="50"></td>
              </tr> */}

            </tbody>
          </table>
        </td>
      </tr>
      {/* <tr>
        <td height="20"></td>
      </tr> */}
    </tbody>
  </table>
  </div>
  </>
  )
}




