package io.takima.demo.entites


import java.util.*
import javax.persistence.*

@Entity (name="users")
data class User (
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id var id: Long?,
    @Column(name = "prenom") var prenom: String?,
    @Column(name = "nom") var nom: String?,
    @Column(name = "email") var email: String?,
    @Column(name = "date_naissance")  var dateNaissance: Date?) {
        constructor() : this(null, null, null, null, null)
}