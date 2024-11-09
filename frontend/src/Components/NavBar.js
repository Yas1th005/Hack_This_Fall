import React from 'react'

export default function NavBar({onSelect}) {

  const handleInput=(value)=>{
    onSelect(value)
  }

  return (
    <div>
 
<div class="input">
  <button class="value" onClick={()=>handleInput("Text")}>
    Text
  </button>
  <button class="value" onClick={()=>handleInput("Image")}>
    Image
  </button>
  <button class="value" onClick={()=>handleInput("Binary")}>
    Binary Data
  </button>
</div>



<style>{`
/* From Uiverse.io by andrei0x309 */ 
.input {
  display: flex;
  flex-direction: row;
  width: fit-content;
  background-color: #150e1a6b;
  justify-content: center;
  border-radius: 5px;
  gap: 7.5px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1rem;
  padding-left: 10px;
  padding-right: 10px;
  transition: all 0.2s ease;
  border: 1px solid #310f446b;
  font-size: 0.9rem;
}

.value {
  background-color: transparent;
  border: none;
  padding: 10px;
  color: aliceblue;
  display: flex;
  position: relative;
  gap: 5px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.value:not(:active):hover,
.active,
.value:focus {
  background-color: #21262cad;
}

.value:focus,
.value:active {
  background-color: #1a1f24;
  outline: none;
}

.value::before {
  content: "";
  position: absolute;
  top: 35px;
  right: 0px;
  width: 100%;
  height: 1px;
  background-color: #0a01303f;
  border-radius: 5px;
  opacity: 0;
}

.value:focus::before,
.value:active::before {
  opacity: 1;
}

.value svg {
  width: 15px;
  margin-top: 4px;
}

.value svg.normal {
  width: 15px;
  margin-top: 1px;
}

`}</style>

    </div>
  )
}
