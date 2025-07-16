import {type FC, memo, useState} from "react";
import {useNavigate} from "react-router-dom";
import BranchForm, {type BranchFormValues} from "../layouts/BranchForm.tsx";
import RepresentativeForm, {type RepresentativeFormValues} from "../layouts/RepresentativeForm.tsx";
import SupplierForm, {type SupplierFormValues} from "../layouts/SupplierForm.tsx";
import type {AddSupplierRequest} from "../models/request/AddSupplierRequest.ts";
import SupplierService from "../services/SupplierService.ts";
import styles from "../styles/addSupplier.module.scss"

const AddSupplier: FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const [supplierData, setSupplierData] = useState<SupplierFormValues | null>(null);
    const [branchData, setBranchData] = useState<BranchFormValues | null>(null);
    const [representativeData, setRepresentativeData] = useState<RepresentativeFormValues | null>(null);

    const handleNext = () => setStep(prev => prev + 1);
    const handlePrev = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        if (!supplierData || !branchData || !representativeData) {
            console.error("Заполните все обязательные поля")
            return
        }

        const request: AddSupplierRequest = {
            supplier: supplierData,
            branch: branchData,
            representative: representativeData,
        }

        try {
            await SupplierService.create(request);
            navigate('/suppliers')
        } catch (e) {
            console.error("Не удалось добавить поставщика")
        }
    };

    return (
        <main className={styles.supplierFormContainer}>
            <h2>Добавление поставщика</h2>
            {step === 1 && <SupplierForm
                onNext={handleNext}
                onChange={setSupplierData}
                // @ts-ignore
                initialValues={supplierData}
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

export default memo(AddSupplier);