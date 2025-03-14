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
            type: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            plan_type: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            middlename: {
                notNull: false,
                unique: false,
                dataType: DATA_TYPE.String
            },
            email: {
                notNull: false,
                unique: false,
                dataType: DATA_TYPE.String
            },

            user_image: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            provider_id: {
                notNull: true,
                dataType: DATA_TYPE.Number
            },
            nimc_number: {
                notNull: false,
                dataType: DATA_TYPE.String
            },
            marital_status: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
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
                notNull: true,
            },
            genotype: {
                notNull: false,
                dataType: DATA_TYPE.String
            },
            address: {
                dataType: DATA_TYPE.String,
                notNull: false
            },
            weight: {
                dataType: DATA_TYPE.String,
                notNull: false
            },
            blood: {
                dataType: DATA_TYPE.String,
                notNull: false
            },
            // state: {
            //     dataType: DATA_TYPE.Number,
            //     notNull: true
            // },
            localgovt: {
                dataType: DATA_TYPE.Number,
                notNull: true
            },
            ward: {
                dataType: DATA_TYPE.Number,
                notNull: false
            },
            enrolled_by: {
                dataType: DATA_TYPE.Number,
                notNull: true
            },
            org_id: {
                dataType: DATA_TYPE.Number,
                notNull: true
            },
            expiry_date: {
                dataType: DATA_TYPE.String,
                notNull: true
            },
            salary_number: {
                dataType: DATA_TYPE.String,
                notNull: true
            },
            place_of_work: {
                dataType: DATA_TYPE.String,
                notNull: false
            },
            sector: {
                dataType: DATA_TYPE.String,
                notNull: true
            },
            sectorType: {
                dataType: DATA_TYPE.String,
                notNull: true
            },

            category_of_vulnerable_group: {
                dataType: DATA_TYPE.String,
                notNull: false
            },
            point_of_care: {
                dataType: DATA_TYPE.String,
                notNull: false
            },

            agency_id: {
                dataType: DATA_TYPE.Number,
                notNull: true
            },
           
            dependent_identifier: { // the id of the principal for the dependent, will be the staff_id of the principal
                dataType: DATA_TYPE.String,
                notNull: false
            },
            dependent_firstname: {
                dataType: DATA_TYPE.String,
                notNull: false
            },
            dependent_lastname: {
                dataType: DATA_TYPE.String,
                notNull: false
            },
            dependent_rel_type: {
                dataType: DATA_TYPE.String,
                notNull: false
            },
            
            dependent_gender: {
                dataType: DATA_TYPE.String,
                notNull: false
            },
            dependent_dob: {
                dataType: DATA_TYPE.String,
                notNull: false
            },
            dependent_phone_number: {
                dataType: DATA_TYPE.String,
                notNull: false
            },
           
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
