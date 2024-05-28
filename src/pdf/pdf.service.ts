import { Injectable } from '@nestjs/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as mysql from 'mysql';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()

export class PdfService {
  private readonly pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'e-commerce',
  });
  async generatePdf(): Promise<Buffer> {
    try {
      // Assuming you have a method named `getdata()` to asynchronously fetch data
      const data: any = await this.getdata();
      console.log(data);
  
      const tableBody = [
        [
          { text: 'Name', bold: true, alignment: 'center' },
          { text: 'Email', bold: true, alignment: 'center' },
          { text: 'Mobile Number', bold: true, alignment: 'center' },
          { text: 'Address', bold: true, alignment: 'center' },
        ],
        ...data.map(item => [
          { text: item.user_name, alignment: 'center' },
          { text: item.user_email, alignment: 'center' },
          { text: item.user_mobile_no, alignment: 'center' },
          { text: item.user_address, alignment: 'center' }
        ])
      ];
  
      const docDefinition = {
        content: [
          { text: 'User Information', fontSize: 15, bold: true, alignment: 'center', margin: [0, 0, 0, 20] },
          {
            table: {
              headerRows: 1,
              widths: ['*', '*', '*', '*'],
              body: tableBody
            },
            layout: 'lightHorizontalLines'
          }
        ]
      };
  
      return new Promise<Buffer>((resolve, reject) => {
        const pdfDoc = pdfMake.createPdf(docDefinition);
        pdfDoc.getBuffer((buffer) => {
          resolve(buffer);
        });
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error; // Rethrow the error
    }
  }
  async getdata(): Promise<string> {
    let objectToSend = {}
    const sql = `SELECT * FROM user_details`;

    return new Promise((resolve, reject) => {
      this.pool.query(sql, (err, result) => {
        if (err) {
          console.error('Error saving message:', err);
          objectToSend["error"] = true;
          objectToSend["data"] = "Server Side Error. Can't upload file at the moment "
          reject('Error saving message');
        } else {
          objectToSend["error"] = false;
          objectToSend["data"] = result
          resolve(result);
        }
      });
    });
  }


}
