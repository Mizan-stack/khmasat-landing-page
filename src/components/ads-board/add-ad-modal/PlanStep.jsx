import AdsSubscriptionsPicker from '../AdsSubscriptionsPicker'

function PlanStep({ planCycle, selectedPlanKey, onCycleChange, onSelectPlan, onContinue }) {
  return (
    <AdsSubscriptionsPicker
      title="اختر الباقة المناسبة لإعلانك"
      description="كل الاشتراكات تظهر هنا كاملة بكل المزايا والتفاصيل، وبعد اختيار الباقة المناسبة نكمل مباشرة بيانات الإعلان والدفع."
      activeCycle={planCycle}
      selectedPlanKey={selectedPlanKey}
      onCycleChange={onCycleChange}
      onSelectPlan={onSelectPlan}
      actionLabel="التالي"
      onAction={onContinue}
      selectedSummaryLabel="الباقة التي ستُفعّل لإعلانك"
      summaryNote="يمكنك تغيير الباقة أو دورة الدفع الآن قبل الانتقال لبيانات الإعلان."
    />
  )
}

export default PlanStep
