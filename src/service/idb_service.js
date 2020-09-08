import { connection } from "./jsstore_con";
import { DATA_TYPE } from "jsstore";

const getDatabase = () => {
    const tblStudent = {
        name: 'Users',
        columns: {
            id: {
                primaryKey: true,
                autoIncrement: true
            },
            firstname: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            lastname: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            // email: {
            //     notNull: false,
            //     unique: true,
            //     dataType: DATA_TYPE.String
            // },
            phone_number: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            dob: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            gender: {
                dataType: DATA_TYPE.String,
                default: 'male'
            },
            genotype: {
                notNull: false,
                dataType: DATA_TYPE.String
            },
            address: {
                dataType: DATA_TYPE.String,
                notNull: true
            },
            weight: {
                dataType: DATA_TYPE.String,
                notNull: false
            },
            blood: {
                dataType: DATA_TYPE.String,
                notNull: false
            },
            agency_id: {
                dataType: DATA_TYPE.Number,
                notNull: true
            }
        }
    };
    const dataBase = {
        name: "HIP",
        tables: [tblStudent]
    };
    return dataBase;
};

export const initJsStore = async () => {
    const dataBase = getDatabase();
    return await connection.initDb(dataBase);
};
