// custom validator to check that two fields match
export default function MailBody(body: string) {
    let html = 
    `<style type="text/css">
    img {
    max-width: 100%;
    }
    body {
    -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 20px;
    }
    p,td{line-height:1.5em;display: block;}
    body {
    background-color: #f6f6f6;
    overflow: hidden;
    }
    img{max-width: 100%;}
    .button {
        padding: 10px 20px;
        border-radius: 5px;
        -o-border-radius: 5px;
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
        background-color: #E76131;
        text-transform: capitalize;
        color: #FFF;
        text-decoration: none;
        font-weight: bold;
        font-size: 14px;
    }
    @media only screen and (max-width: 640px) {
        .conteudo {
            width: 94%;
        }
        .hidden-cel {display: none;}
    }
    </style>
    <body>
    <meta charset="UTF-8" />
    <br/><br/>
    <table style="margin:15px 0;" width="100%" bgcolor="#f6f6f6">
        <tr>
            <td>
                <table width="640" class="conteudo" align="center" bgcolor="#fff" style="border:1px solid #e9e9e9;padding:20px;font-size:14px;color:#404040;font-family:'arial'">
                    <tr>
                        <td>
                            <center><img src="http://loja.easytoque.com.br/skin/frontend/easytoque/default/images/logo/easytoque.png" style="max-width:100%" alt="Easytoque" width=250></center>
                            <br/>
                            `+body+`
                            <p>&mdash; Equipe Easytoque</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>	
    <br/><br/>
    </body>`;

    return html;
}