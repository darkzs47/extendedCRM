import {type FC, memo, useState} from "react";
import CustomerForm, {type CustomerFormValues} from "../../components/forms/Customer.tsx";
import BranchForm, {type BranchFormValues} from "../../components/forms/Branch.tsx";
import RepresentativeForm, {type RepresentativeFormValues} from "../../components/forms/Representative.tsx";
import type {AddCustomerRequest} from "../../models/request/AddCustomerRequest.ts";
import CustomerService from "../../services/CustomerService.ts";
import {useNavigate} from "react-router-dom";
import styles from "./addCustomer.module.scss"

const AddCustomer: FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const [customerData, setCustomerData] = useState<CustomerFormValues | null>(null);
    const [branchData, setBranchData] = useState<BranchFormValues | null>(null);
    const [representativeData, setRepresentativeData] = useState<RepresentativeFormValues | null>(null);

    const handleNext = () => setStep(prev => prev + 1);
    const handlePrev = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        if (!customerData || !branchData || !representativeData) {
            console.error("Заполните все обязательные поля")
            return
        }

        const request: AddCustomerRequest = {
            customer: {
                ...customerData,
                discount: customerData.discount / 100
            },
            branch: branchData,
            representative: representativeData,
        }

        try {
            await CustomerService.create(request);
            navigate('/customers')
        } catch (e) {
            console.error("Не удалось добавить клиента")
        }
    };

    return (
        <main className={styles.customerFormContainer}>
            <h2>Добавление клиента</h2>
            {step === 1 && <CustomerForm
                onNext={handleNext}
                onChange={setCustomerData}
                // @ts-ignore
                initialValues={customerData}
            />}
            {step === 2 && <BranchForm
                onNext={handleNext}
                onBack={handlePrev}
                onChange={setBranchData}
                // @ts-ignore
                initialValues={branchData}
            />}
            {step === 3 && <RepresentativeForm
                onBack={handlePrev}
                onSubmit={handleSubmit}
                onChange={setRepresentativeData}
                // @ts-ignore
                initialValues={representativeData}
            />}
        </main>
    )
}

export default memo(AddCustomer);