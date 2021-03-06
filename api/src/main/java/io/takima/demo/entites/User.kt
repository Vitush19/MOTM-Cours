package io.takima.demo.entites

import java.util.*
import javax.persistence.*

/**
 *
 */
@Entity(name = "users")
data class User(
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Id var id: Long?,
        @Column(name = "first_name") var firstName: String?,
        @Column(name = "last_name") var lastName: String?,
        @Column(name = "age") var age: Date?,
        @Column(name = "mail") var mail: String?
) {
constructor() : this(null, null, null, null, null)
}