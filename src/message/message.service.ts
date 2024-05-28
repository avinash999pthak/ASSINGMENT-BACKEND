import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql';

@Injectable()
export class MessageService {
  private readonly pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'e-commerce',
  });

//////////insert data ///////////////
  async insert_data(obj: any): Promise<string> {
    console.log('Received message:', obj);
    let objectToSend = {}
    const sql = `INSERT INTO user_details (user_name,user_mobile_no,user_address,user_email) VALUES
                  ('${obj.name}',${obj.number},'${obj.address}','${obj.email}')`;

    return new Promise((resolve, reject) => {
      this.pool.query(sql, (err, result) => {
        if (err) {
          console.error('Error saving message:', err);
          objectToSend["error"] = true;
          objectToSend["data"] = "Server Side Error. Can't upload file at the moment "
          reject('Error saving message');
        } else {
          objectToSend["error"] = false;
          objectToSend["data"] = 'Data Inserted Successfully'
          resolve(JSON.stringify(objectToSend));
        }
      });
    });
  }
//'''''''''''''''''''''''''''''''''''''''''''get data/''''''''''''''''''''''''''''''''''
  async getdata(obj: any): Promise<string> {
    console.log('Received message:', obj);
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
          resolve(JSON.stringify(objectToSend));
        }
      });
    });
  }
// '/'''''''''''''''''''''''''''''''''''''''delete data '''''''''''''''''''''''''''''''''
async deleteItem(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let objectToSend: { error: boolean, data: string } = { error: false, data: '' };
      const sql = `DELETE FROM user_details WHERE id = ${id}`;
  
      this.pool.query(sql, (err, result) => {
        if (err) {
          console.error('Error deleting item:', err);
          objectToSend.error = true;
          objectToSend.data = "Server Side Error. Can't upload file at the moment";
          reject(objectToSend);
        } else {
          console.log('Item deleted successfully');
          objectToSend.error = false;
          objectToSend.data = "Data Deleted Successfully";
          resolve(objectToSend);
        }
      });
    });
  }
  
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////

async update(obj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let objectToSend: { error: boolean, data: string } = { error: false, data: '' };
      const sql = `UPDATE user_details SET user_name = '${obj.user_name}',user_mobile_no= ${obj.user_mobile_no},user_email= '${obj.user_email}',
      user_address = '${obj.user_address}' WHERE id = ${obj.id}`;
  
      this.pool.query(sql, (err, result) => {
        if (err) {
          console.error('Error deleting item:', err);
          objectToSend.error = true;
          objectToSend.data = "Server Side Error. Can't upload file at the moment";
          reject(objectToSend);
        } else {
          console.log('Item deleted successfully');
          objectToSend.error = false;
          objectToSend.data = "Data Updated Successfully";
          resolve(objectToSend);
        }
      });
    });
  }

}
