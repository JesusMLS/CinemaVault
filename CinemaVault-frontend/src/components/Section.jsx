function Section({children, Id, Class, AddPading = true }){
    return(
        <section id={Id} className={AddPading ? "px-4 sm:px-12 " + Class: Class}>
            {children}
        </section>
    )
}

export default Section