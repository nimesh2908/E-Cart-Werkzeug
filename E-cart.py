from werkzeug.utils import escape
from werkzeug.wrappers import Request, Response

@Request.application
def Ecart(request):
    result = ['<title>E-Cart</title>']
    #if request.method == 'POST':
        #result.append('<h1>Hello %s!</h1>' % escape(request.form['name']))
    result.append('''

        <script language="JavaScript">
            function btn(){
                            var w=document.getElementById('input').value;
                            if(w==0)
                            {
                                null;
                            }
                            else
                            {
                            document.getElementById('display').innerHTML = w +"  Watch "+ " = " + w*2000 + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + "<input type='button' id='rm1' value='Remove' onclick='rmv()'>";
                            }
            }
            function btn1(){
                            var t=document.getElementById('input1').value;
                            if(t==0)
                            {
                                null;
                            }
                            else
                            {
                            document.getElementById('display1').innerHTML=t+ " T-Shirt " +"="+ t*1500 + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + "<input type='button' id='rm2' value='Remove' onclick='rmv1()'>";
                            }
            }
            function btn2(){
                            var s=document.getElementById('input2').value;
                            if(s==0)
                            {
                                null;
                            }
                            else
                            {
                            document.getElementById('display2').innerHTML=s+ " Shoes " +"="+ s*4000 + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + "<input type='button' id='rm3' value='Remove' onclick='rmv2()'>";
                            }
            }
            function rmv(){
                            var w=document.getElementById('input').value="";
                            document.getElementById('display').innerHTML="";
            }
            function rmv1(){
                            var w=document.getElementById('input1').value="";
                            document.getElementById('display1').innerHTML="";
            }
            function rmv2(){
                            var w=document.getElementById('input2').value="";
                            document.getElementById('display2').innerHTML="";
            }
        </script>

        <body style="background-color:mediumseagreen;">
            <marquee style="color:Red; font-size:50px;">ONILNE SHOPPING CHANNEL</marquee>
            <form action="" method="post" style="padding:6%;"">
                <table align="center"  style="background-color:lavender; border:5px solid black;">
                    <th>
                        <h1>Watch</h1>
                        <h2>RS 2000</h2>
                        <input type="text" id="input" placeholder="Quantity"></br></br>
                        <input type="Button" value="Add To Cart" onclick="btn()">
                    </th>
                    <th>
                        <h1>T-Shirt</h1>
                        <h2>RS 1500</h2>
                        <input type="text" id="input1" placeholder="Quantity"></br></br>
                        <input type="Button" value="Add To Cart" onclick="btn1()">
                    </th>
                    <th>
                        <h1>Shoes</h1>
                        <h2>RS 4000</h2>
                        <input type="text" id="input2" placeholder="Quantity"></br></br>
                        <input type="Button" value="Add To Cart" onclick="btn2()">
                    </th>
                </table>
            </form>
            <div align="center" style="border:5px solid black; width:25%; margin-left:37%;">
                <label style="font-size:25px; color:">----CART----</label>
                <p style="background-color:darkgray; width:400px;"><span  id='display'></span></p>
                <p style="background-color:darkgray; width:400px;"><span id='display1'></span></p>
                <p style="background-color:darkgray; width:400px;"><span id='display2'></span></p>
            </div>
        </body>
    ''')
    return Response(''.join(result), mimetype='text/html')
if __name__ == '__main__':
    from werkzeug.serving import run_simple
    run_simple('localhost', 5000, Ecart)
