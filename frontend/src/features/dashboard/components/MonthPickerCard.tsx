import { useState, useEffect } from "react"

interface Period {
  month?: string
  start_month?: string
  end_month?: string
}

interface Props {
  value: Period
  onChange: (period: Period) => void
}

const months = [
  "JAN","FEV","MAR","ABR",
  "MAI","JUN","JUL","AGO",
  "SET","OUT","NOV","DEZ"
]

export default function MonthPickerCard({ value, onChange }: Props) {

  const now = new Date()

  const initialYear =
    value?.month
      ? Number(value.month.split("-")[0])
      : value?.start_month
      ? Number(value.start_month.split("-")[0])
      : now.getFullYear()

  const [year,setYear] = useState(initialYear)

  const [open,setOpen] = useState(false)
  const [mode,setMode] = useState<"month"|"range">("month")

  const [start,setStart] = useState<string | null>(null)
  const [end,setEnd] = useState<string | null>(null)

  useEffect(()=>{
    if(value?.month){
      setMode("month")
    }

    if(value?.start_month && value?.end_month){
      setMode("range")
    }
  },[value])

  const selectMonth = (index:number)=>{

    const m = String(index+1).padStart(2,"0")

    // MODO MÊS
    if(mode==="month"){

      onChange({ month:`${year}-${m}` })

      setOpen(false)
      setStart(null)
      setEnd(null)

      return
    }

    // MODO RANGE
    if(mode==="range"){

      if(!start){
        setStart(m)
        return
      }

      let startMonth = start
      let endMonth = m

      // garante ordem correta
      if(Number(endMonth) < Number(startMonth)){
        const temp = startMonth
        startMonth = endMonth
        endMonth = temp
      }

      onChange({
        start_month:`${year}-${startMonth}`,
        end_month:`${year}-${endMonth}`
      })

      setStart(null)
      setEnd(null)

      setOpen(false)
    }
  }

  const label = value?.start_month && value?.end_month
    ? `${months[Number(value.start_month.split("-")[1])-1]} → ${months[Number(value.end_month.split("-")[1])-1]}`
    : value?.month
    ? `${months[Number(value.month.split("-")[1])-1]} / ${value.month.split("-")[0]}`
    : `${months[now.getMonth()]} / ${year}`

  return (

    <div style={{position:"relative"}}>

      <button
        onClick={()=>setOpen(!open)}
        style={{
          background:"#fff",
          border:"1px solid #e5e7eb",
          borderRadius:"10px",
          padding:"8px 14px",
          fontWeight:600,
          cursor:"pointer"
        }}
      >
        {label} ▾
      </button>

      {open && (

        <div
          style={{
            position:"absolute",
            top:"45px",
            right:0,
            background:"#fff",
            padding:"20px",
            borderRadius:"12px",
            border:"1px solid #e5e7eb",
            width:"320px",
            boxShadow:"0 10px 30px rgba(0,0,0,0.08)",
            zIndex:10
          }}
        >

          {/* MODO */}

          <div style={{display:"flex",gap:"10px",marginBottom:"12px"}}>

            <button
              onClick={()=>{
                setMode("month")
                setStart(null)
                setEnd(null)
              }}
              style={mode==="month"?activeBtn:btn}
            >
              Mês
            </button>

            <button
              onClick={()=>{
                setMode("range")
                setStart(null)
                setEnd(null)
              }}
              style={mode==="range"?activeBtn:btn}
            >
              Acumulado
            </button>

          </div>

          {/* HEADER */}

          <div
            style={{
              display:"flex",
              justifyContent:"space-between",
              marginBottom:"12px"
            }}
          >

            <button onClick={()=>setYear(year-1)} style={navBtn}>←</button>

            <strong>{year}</strong>

            <button onClick={()=>setYear(year+1)} style={navBtn}>→</button>

          </div>

          {/* GRID */}

          <div
            style={{
              display:"grid",
              gridTemplateColumns:"repeat(4,1fr)",
              gap:"8px"
            }}
          >

            {months.map((m,i)=>{

              const month = String(i+1).padStart(2,"0")

              const selected =
                month===start ||
                month===end

              return(

                <button
                  key={m}
                  onClick={()=>selectMonth(i)}
                  style={{
                    padding:"8px",
                    borderRadius:"8px",
                    border:"1px solid #e5e7eb",
                    background:selected?"#2563eb":"#f9fafb",
                    color:selected?"#fff":"#111",
                    cursor:"pointer"
                  }}
                >
                  {m}
                </button>

              )

            })}

          </div>

        </div>

      )}

    </div>

  )
}

const btn = {
  padding:"6px 10px",
  border:"1px solid #e5e7eb",
  background:"#f9fafb",
  borderRadius:"6px",
  cursor:"pointer"
}

const activeBtn = {
  ...btn,
  background:"#2563eb",
  color:"#fff"
}

const navBtn = {
  padding:"4px 8px",
  border:"1px solid #e5e7eb",
  borderRadius:"6px",
  background:"#f9fafb",
  cursor:"pointer"
}