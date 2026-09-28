from fastapi import APIRouter, Depends, Query

router = APIRouter()


@router.get("/invoices/{invoice_id}")
async def get_invoice(
    invoice_id: str,
    organization_id: str = Query(...),
    current_user=Depends(get_current_user),
):
    return await Invoice.find_one(
        Invoice.id == invoice_id,
        Invoice.organization_id == organization_id,
    )
