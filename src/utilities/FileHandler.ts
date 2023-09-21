import { promises as fsPromises } from "fs";

export class FileHandler{
    
    static async readDataFromJsonFile(jsonFileLocation){
        try{
            const data=await fsPromises.readFile(jsonFileLocation,'utf8');
            return data;
        }catch(err){
            console.log(err)
            return 'Something went wrong'
        }

    }

}