package io.takima.demo

import com.fasterxml.jackson.annotation.JsonManagedReference
import io.takima.demo.mail.Mail
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
        @Column(name = "age") var age: Int?,
        @JsonManagedReference
        @OneToMany(mappedBy = "user")
        val mailList: List<Mail>
) {

constructor() : this(null, null, null, null, mutableListOf() )//

}